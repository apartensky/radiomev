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
package edu.dfci.cccb.mev.hcl.domain.prototype;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import edu.dfci.cccb.mev.dataset.domain.contract.Dataset;
import edu.dfci.cccb.mev.dataset.domain.contract.DatasetException;
import edu.dfci.cccb.mev.dataset.domain.contract.Dimension;
import edu.dfci.cccb.mev.dataset.domain.contract.Dimension.Type;
import edu.dfci.cccb.mev.dataset.domain.prototype.AbstractAnalysis;
import edu.dfci.cccb.mev.hcl.domain.contract.Hcl;
import edu.dfci.cccb.mev.hcl.domain.contract.Node;
import edu.dfci.cccb.mev.hcl.domain.simple.SimpleHierarchicallyClusteredDimension;

/**
 * @author levk
 * 
 */
@ToString (exclude = "dataset")
@EqualsAndHashCode (callSuper = true)
@Accessors (fluent = true, chain = true)
@JsonIgnoreProperties({"root", "timestamp", "dimension"})
public abstract class AbstractHcl extends AbstractAnalysis<AbstractHcl> implements Hcl {
  public final static String ANALYSIS_TYPE = "Hierarchical Clustering";
  private @Getter @Setter Node root;
  private @Setter Dimension dimension;
  private @Getter @Setter Dataset dataset;
  public AbstractHcl(){
	  type(ANALYSIS_TYPE);
  }
  /* (non-Javadoc)
   * @see edu.dfci.cccb.mev.hcl.domain.contract.HclResult#apply() */
  @Override
  public Dimension apply () throws DatasetException {
    Dimension result = new SimpleHierarchicallyClusteredDimension (dimension.type (),
                                                                   root,
                                                                   dimension.selections (),
                                                                   dimension.annotation ());
    dataset.set (result);
    return result;
  }

  /* (non-Javadoc)
   * @see edu.dfci.cccb.mev.hcl.domain.contract.Hcl#dimension() */
  @Override
  public Type dimension () {
    return dimension.type ();
  }
}
