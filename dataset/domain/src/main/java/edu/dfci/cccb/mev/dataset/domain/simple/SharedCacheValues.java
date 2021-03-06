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
package edu.dfci.cccb.mev.dataset.domain.simple;

import static com.google.common.cache.CacheBuilder.newBuilder;
import static edu.dfci.cccb.mev.dataset.domain.support.LifecycleUtilities.destroy;
import static java.util.concurrent.TimeUnit.SECONDS;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.javatuples.Triplet;

import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import edu.dfci.cccb.mev.dataset.domain.contract.InvalidCoordinateException;
import edu.dfci.cccb.mev.dataset.domain.contract.Values;
import edu.dfci.cccb.mev.dataset.domain.prototype.AbstractValues;

/**
 * @author levk
 * 
 */
@ToString
@RequiredArgsConstructor
public class SharedCacheValues extends AbstractValues implements AutoCloseable {

  private static final TimeUnit DURATION_UNIT = SECONDS;
  private static final long DURATION = 100;
  private static final long CACHE_SIZE = 10000000L;
  private static final LoadingCache<Triplet<Values, String, String>, Double> CACHE;

  static {
    CACHE = newBuilder ().expireAfterAccess (DURATION, DURATION_UNIT)
                         .maximumSize (CACHE_SIZE)
//                         .removalListener (new RemovalListener<Triplet<Values, String, String>, Double> () {
//                           @Override
//                           public void onRemoval (RemovalNotification<Triplet<Values, String, String>, Double> notification) {
//                             log.debug ("Expunging " + notification.getKey () + " because " + notification.getCause ().name ());
//                           }
//                         })
                         .build (new CacheLoader<Triplet<Values, String, String>, Double> () {

                           @Override
                           public Double load (Triplet<Values, String, String> key) throws Exception {
                             //log.debug ("Cache miss for " + key);
                             return key.getValue0 ().get (key.getValue1 (), key.getValue2 ());
                           }
                         });
  }

  private final Values values;

  /* (non-Javadoc)
   * @see
   * edu.dfci.cccb.mev.dataset.domain.contract.Values#get(java.lang.String,
   * java.lang.String) */
  @Override
  public double get (String row, String column) throws InvalidCoordinateException {
    try {
      return CACHE.get (new Triplet<Values, String, String> (values, row, column));
    } catch (ExecutionException e) {
      throw (InvalidCoordinateException) e.getCause ();
    }
  }

  /* (non-Javadoc)
   * @see java.lang.AutoCloseable#close() */
  @Override
  public void close () throws Exception {
    destroy (new Exception ("Failure to close values " + values), values);
  }
}
