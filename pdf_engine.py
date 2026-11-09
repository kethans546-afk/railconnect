# -*- coding: utf-8 -*-
"""
Pure Python 37-Page A4 PDF Builder for RAILCONNECT Engineering Report
SRM Institute of Science and Technology
Students:
- S Kethan (RA2511026050134)
- B Balaji (RA2511026050179)
"""

import os
import sys

# A4 dimensions in points (72 points = 1 inch, 1 pt = 0.352778 mm)
# 210mm x 297mm = 595.28 x 841.89 points
PAGE_WIDTH = 595.28
PAGE_HEIGHT = 841.89

# Margins: 15mm = 42.5 points
MARGIN_X = 42.5
MARGIN_Y = 42.5
USABLE_WIDTH = PAGE_WIDTH - (2 * MARGIN_X) # 510.28 pt
USABLE_HEIGHT = PAGE_HEIGHT - (2 * MARGIN_Y) # 756.89 pt

class PDFBuilder:
    def __init__(self):
        self.pages = [] # list of stream bytes
        self.objects = [] # list of obj content strings

    def escape_text(self, text):
        return text.replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')

    def create_page_stream(self):
        return []

    def add_page(self, stream_ops):
        # Join stream operations
        stream_content = "\n".join(stream_ops)
        self.pages.append(stream_content.encode('latin1', errors='replace'))

    def build_pdf(self, output_path):
        num_pages = len(self.pages)
        print(f"Compiling PDF with {num_pages} pages...")

        # We will dynamically assemble PDF objects:
        # 1: Catalog
        # 2: Pages
        # 3 to 9: Font objects (Times, Times-Bold, Times-Italic, Helvetica, Helvetica-Bold, Courier, Courier-Bold)
        # 10 to (10 + num_pages - 1): Page objects
        # (10 + num_pages) to (10 + 2*num_pages - 1): Content stream objects
        
        objects = {} # id -> bytes

        # Catalog
        objects[1] = b"<< /Type /Catalog /Pages 2 0 R >>"

        # Font IDs
        fonts = {
            "/F1": (3, "Times-Roman"),
            "/F2": (4, "Times-Bold"),
            "/F3": (5, "Times-Italic"),
            "/F4": (6, "Helvetica"),
            "/F5": (7, "Helvetica-Bold"),
            "/F6": (8, "Courier"),
            "/F7": (9, "Courier-Bold")
        }

        for font_alias, (obj_id, font_name) in fonts.items():
            objects[obj_id] = f"<< /Type /Font /Subtype /Type1 /BaseFont /{font_name} >>".encode('ascii')

        # Pages Kids
        page_obj_start = 10
        stream_obj_start = page_obj_start + num_pages
        kids_refs = " ".join([f"{page_obj_start + i} 0 R" for i in range(num_pages)])
        objects[2] = f"<< /Type /Pages /Kids [{kids_refs}] /Count {num_pages} >>".encode('ascii')

        font_resources = " ".join([f"{alias} {obj_id} 0 R" for alias, (obj_id, _) in fonts.items()])

        # Build Page and Content objects
        for i in range(num_pages):
            page_obj_id = page_obj_start + i
            stream_obj_id = stream_obj_start + i
            stream_bytes = self.pages[i]

            # Page obj
            objects[page_obj_id] = (
                f"<< /Type /Page /Parent 2 0 R "
                f"/MediaBox [0 0 {PAGE_WIDTH:.2f} {PAGE_HEIGHT:.2f}] "
                f"/Resources << /Font << {font_resources} >> >> "
                f"/Contents {stream_obj_id} 0 R >>"
            ).encode('ascii')

            # Stream obj
            objects[stream_obj_id] = (
                f"<< /Length {len(stream_bytes)} >>\nstream\n".encode('ascii')
                + stream_bytes +
                b"\nendstream"
            )

        # Assemble file with xref
        total_objects = 10 + (2 * num_pages)
        xref_offsets = {}
        pdf_parts = [b"%PDF-1.4\n"]

        current_offset = len(pdf_parts[0])

        for obj_id in range(1, total_objects):
            xref_offsets[obj_id] = current_offset
            obj_bytes = f"{obj_id} 0 obj\n".encode('ascii') + objects[obj_id] + b"\nendobj\n"
            pdf_parts.append(obj_bytes)
            current_offset += len(obj_bytes)

        # xref table
        startxref = current_offset
        xref_str = f"xref\n0 {total_objects}\n0000000000 65535 f \n"
        for obj_id in range(1, total_objects):
            xref_str += f"{xref_offsets[obj_id]:010d} 00000 n \n"
        
        trailer_str = (
            f"trailer\n<< /Size {total_objects} /Root 1 0 R >>\n"
            f"startxref\n{startxref}\n%%EOF"
        )

        pdf_parts.append(xref_str.encode('ascii') + trailer_str.encode('ascii'))

        with open(output_path, "wb") as f:
            for part in pdf_parts:
                f.write(part)

        file_size = os.path.getsize(output_path)
        print(f"Successfully generated PDF: {output_path} ({file_size:,} bytes)")
        return file_size

print("Base PDF Engine initialized.")
