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
package edu.dfci.cccb.mev.heatmap.domain;

/**
 * @author levk
 *
 */
public class InvalidProjectionException extends DataException {
  private static final long serialVersionUID = 1L;
  
  {
    code ("heatmap.invalid.projection");
  }

  public InvalidProjectionException projection (Projection projection) {
    argument ("projection.dimension", projection.dimension ().toString ());
    argument ("projection.id", projection.id ());
    return this;
  }

  /**
   * 
   */
  public InvalidProjectionException () {}

  /**
   * @param message
   */
  public InvalidProjectionException (String message) {
    super (message);
  }

  /**
   * @param cause
   */
  public InvalidProjectionException (Throwable cause) {
    super (cause);
  }

  /**
   * @param message
   * @param cause
   */
  public InvalidProjectionException (String message, Throwable cause) {
    super (message, cause);
 }

  /**
   * @param message
   * @param cause
   * @param enableSuppression
   * @param writableStackTrace
   */
  public InvalidProjectionException (String message,
                                     Throwable cause,
                                     boolean enableSuppression,
                                     boolean writableStackTrace) {
    super (message, cause, enableSuppression, writableStackTrace);
  }
}
