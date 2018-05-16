/**
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package edu.dfci.cccb.mev.web.configuration;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.springframework.context.Lifecycle;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import edu.dfci.cccb.mev.dataset.client.contract.JavascriptInjectorRegistry;
import edu.dfci.cccb.mev.dataset.client.prototype.MevClientConfigurerAdapter;
import edu.dfci.cccb.mev.dataset.client.simple.MapHotPlugViewRegistry;
import edu.dfci.cccb.mev.web.configuration.converters.ConverterConfigurations;
import edu.dfci.cccb.mev.web.configuration.injectors.InjectorConfigurations;
import edu.dfci.cccb.mev.web.configuration.interceptors.WarnOnDeprecatedRequestMappingInterceptor;
import edu.dfci.cccb.mev.web.configuration.resolvers.ResolverConfigurations;
import lombok.extern.log4j.Log4j;

/**
 * @author levk
 * 
 */
@Configuration
@EnableWebMvc
@Import ({ ResolverConfigurations.class, InjectorConfigurations.class, ConverterConfigurations.class })
@Log4j
public class DispatcherConfiguration extends WebMvcConfigurerAdapter {

  /* (non-Javadoc)
   * @see
   * org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter
   * #addInterceptors
   * (org.springframework.web.servlet.config.annotation.InterceptorRegistry) */
  @Override
  public void addInterceptors (InterceptorRegistry registry) {
    registry.addInterceptor (new WarnOnDeprecatedRequestMappingInterceptor ());
  }

  private @Inject Collection<MevClientConfigurerAdapter> clientConfigurers;
  private @Inject MapHotPlugViewRegistry viewRegistry;
  private @Inject JavascriptInjectorRegistry injectorRegistry;

  @PostConstruct
  public void registerViews () {
    for (MevClientConfigurerAdapter clientConfigurer : clientConfigurers) {
      clientConfigurer.registerAnnotatedClassViews (viewRegistry);
      clientConfigurer.registerXmlBeanResourceViews (viewRegistry);
    }
  }

  @PostConstruct
  public void registerInjectors () {
    for (MevClientConfigurerAdapter clientConfigurer : clientConfigurers)
      clientConfigurer.registerJavascriptInjectors (injectorRegistry);
  }
  
//  @Bean
//  public Lifecycle getLifecyle() {
//	  return new Lifecycle() {
//
//		private boolean isRunning;
//		@Override
//		public boolean isRunning() {
//			return isRunning;
//		}
//
//		@Override
//		public void start() {
//			log.info("STARTEDDDDDDD");
//			System.out.println("******************STARTED LC *******************");
//			this.isRunning=true;
//		}
//
//		@Override
//		public void stop() {
//			log.info("STOPPED");
//			System.out.println("******************STARTED LC *******************");
//			this.isRunning=false;
//			
//		}
//		  
//	  };
//  }
  
}
