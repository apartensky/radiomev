package edu.dfci.cccb.mev.annotation.domain.probe.jooq;

import static org.jooq.impl.DSL.fieldByName;
import static org.jooq.impl.DSL.tableByName;
import static org.jooq.impl.DSL.using;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.sql.SQLException;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;
import javax.sql.DataSource;

import lombok.extern.log4j.Log4j;

import org.jooq.DSLContext;
import org.jooq.Field;
import org.jooq.ResultQuery;
import org.jooq.Table;

import edu.dfci.cccb.mev.annotation.domain.probe.contract.ProbeAnnotation;
import edu.dfci.cccb.mev.annotation.domain.probe.contract.exceptions.AnnotationException;
import edu.dfci.cccb.mev.annotation.domain.probe.prototype.AbstractProbeAnnotations;
import edu.dfci.cccb.mev.dataset.domain.contract.Dimension;


@Log4j
public class JooqProbeAnnotations extends AbstractProbeAnnotations {

  public final static String TABLE_NAME_PREFIX="PROBE_ANNOT_";  
  private final DSLContext context;
  
  @Inject 
  public JooqProbeAnnotations (String platformId, @Named("probe-annotations-datasource") DataSource dataSource) throws SQLException {
    super(platformId);
    context = using (dataSource.getConnection ()); 
  }

  @Override
  public List<ProbeAnnotation> get (Dimension dimension) {
    // TODO Auto-generated method stub
    return null;
  }

//TODO:remove  
//  public InputStream getAsStream (Dimension dimension) {
//    
////    SelectQuery<Tables> query = context.selectQuery()
//            
//    InputStream input=null;    
//    ResultQuery<MevProbeAnnotationsRecord> query = context.selectFrom(Tables.MEV_PROBE_ANNOTATIONS)
//            .where(Tables.MEV_PROBE_ANNOTATIONS.PROBESET_ID.in (dimension.keys ()));
//     log.debug(query.toString ());
//     String csv = query.fetch().formatCSV('\t');
//     try {
//      input = new ByteArrayInputStream (csv.getBytes ("UTF-8"));
//    } catch (UnsupportedEncodingException e) {
//      // TODO Auto-generated catch block
//      e.printStackTrace();
//    }
//    return input;
//  }
  
  
  @Override
  public InputStream getAsStream (Dimension dimension) {
    
//    SelectQuery<Tables> query = context.selectQuery()
    
    Table<?>  table = tableByName (TABLE_NAME_PREFIX+this.platformId ());
    Field<String> probeId = fieldByName (String.class, "PROBESET_ID");
    
    InputStream input=null;    
    ResultQuery<?> query = context.selectFrom(table)
            .where(probeId.in (dimension.keys ()));
     log.debug(query.toString ());
     String csv = query.fetch().formatCSV('\t');
     try {
      input = new ByteArrayInputStream (csv.getBytes ("UTF-8"));
    } catch (UnsupportedEncodingException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }
    return input;
  }

  @Override
  public void loadUrlResource (URL url) throws AnnotationException {
    // TODO Auto-generated method stub
    
  }
  
}
