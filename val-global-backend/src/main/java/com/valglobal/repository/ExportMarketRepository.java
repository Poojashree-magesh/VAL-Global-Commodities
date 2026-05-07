package com.valglobal.repository;

import com.valglobal.model.ExportMarket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExportMarketRepository extends JpaRepository<ExportMarket, Long> {

    List<ExportMarket> findByIsActiveTrueOrderByIdAsc();
}
