package edu.dfci.cccb.mev.voom.rest.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import edu.dfci.cccb.mev.dataset.rest.resolvers.AnalysisPathVariableMethodArgumentResolver;
import edu.dfci.cccb.mev.voom.domain.Voom;
import edu.dfci.cccb.mev.voom.domain.VoomBuilder;

@Configuration
@ComponentScan ("edu.dfci.cccb.mev.voom.rest.controllers")
public class VoomConfiguration {

  @Bean
  @Scope ("prototype")
  public VoomBuilder voom () {
    return new VoomBuilder ();
  }

  @Bean
  public AnalysisPathVariableMethodArgumentResolver<Voom> resolver () {
    return new AnalysisPathVariableMethodArgumentResolver<> (Voom.class);
  }
}
