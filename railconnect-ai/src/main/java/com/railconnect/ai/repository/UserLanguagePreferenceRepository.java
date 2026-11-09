package com.railconnect.ai.repository;

import com.railconnect.ai.model.UserLanguagePreference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserLanguagePreferenceRepository extends JpaRepository<UserLanguagePreference, Long> {

    Optional<UserLanguagePreference> findByUserId(Long userId);

    Optional<UserLanguagePreference> findBySessionId(String sessionId);
}
