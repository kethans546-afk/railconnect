package com.railconnect.ai.repository;

import com.railconnect.ai.model.AIChatHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AIChatHistoryRepository extends JpaRepository<AIChatHistory, Long> {

    List<AIChatHistory> findByUserIdOrderByTimestampDesc(Long userId);

    List<AIChatHistory> findBySessionIdOrderByTimestampDesc(String sessionId);

    List<AIChatHistory> findTop50ByUserIdOrderByTimestampDesc(Long userId);

    List<AIChatHistory> findTop50BySessionIdOrderByTimestampDesc(String sessionId);

    @Modifying
    @Query("DELETE FROM AIChatHistory c WHERE c.user.id = :userId")
    void deleteByUserId(@Param("userId") Long userId);

    @Modifying
    @Query("DELETE FROM AIChatHistory c WHERE c.sessionId = :sessionId")
    void deleteBySessionId(@Param("sessionId") String sessionId);
}
