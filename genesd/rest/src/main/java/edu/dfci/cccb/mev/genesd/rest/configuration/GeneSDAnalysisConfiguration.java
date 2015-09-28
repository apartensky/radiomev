package edu.dfci.cccb.mev.genesd.rest.configuration;

import javax.inject.Named;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import edu.dfci.cccb.mev.dataset.rest.resolvers.AnalysisPathVariableMethodArgumentResolver;
import edu.dfci.cccb.mev.genesd.domain.contract.GeneSDAnalysis;
import edu.dfci.cccb.mev.genesd.domain.contract.GeneSDAnalysisBuilder;
import edu.dfci.cccb.mev.genesd.domain.impl.RserveGeneSDAnalysisBuilder;

@Configuration
@ComponentScan ("edu.dfci.cccb.mev.genesd.rest.controllers")
public class GeneSDAnalysisConfiguration {

  @Bean
  @Named ("genesd.analysis.builder")
  @Scope ("prototype")
  public RserveGeneSDAnalysisBuilder builder () {
    return new RserveGeneSDAnalysisBuilder ();
  }

  @Bean
  public AnalysisPathVariableMethodArgumentResolver<GeneSDAnalysis> resolver () {
    return new AnalysisPathVariableMethodArgumentResolver<> (GeneSDAnalysis.class);
  }
}
