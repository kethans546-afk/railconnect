package com.railconnect.ai.repository;

import com.railconnect.ai.model.AIVoiceHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AIVoiceHistoryRepository extends JpaRepository<AIVoiceHistory, Long> {

    List<AIVoiceHistory> findByUserIdOrderByTimestampDesc(Long userId);

    List<AIVoiceHistory> findBySessionIdOrderByTimestampDesc(String sessionId);

    List<AIVoiceHistory> findTop30ByUserIdOrderByTimestampDesc(Long userId);

    List<AIVoiceHistory> findTop30BySessionIdOrderByTimestampDesc(String sessionId);

    @Modifying
    @Query("DELETE FROM AIVoiceHistory v WHERE v.user.id = :userId")
    void deleteByUserId(@Param("userId") Long userId);

    @Modifying
    @Query("DELETE FROM AIVoiceHistory v WHERE v.sessionId = :sessionId")
    void deleteBySessionId(@Param("sessionId") String sessionId);
}
