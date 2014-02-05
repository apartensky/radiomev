package edu.dfci.cccb.mev.annotation.domain.probe.prototype;

import static edu.dfci.cccb.mev.annotation.domain.probe.dal.jooq.Tables.MEV_PROBE_ANNOTATIONS;
import static org.jooq.impl.DSL.using;

import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.SQLException;

import javax.inject.Inject;
import javax.inject.Named;
import javax.sql.DataSource;

import lombok.extern.log4j.Log4j;

import org.jooq.DSLContext;

import edu.dfci.cccb.mev.annotation.domain.probe.dal.jooq.Tables;
import edu.dfci.cccb.mev.annotation.support.FileChecker;
@Log4j
public class JooqProbeAnnotationsLoader {

  private final DSLContext context;
  
  @Inject
  public JooqProbeAnnotationsLoader ( @Named("probe-annotations-datasource") DataSource dataSource) throws SQLException {
    context = using (dataSource.getConnection ());      
  }
  
  public void init(URL rootFolder, String suffix, long modifiedInLastMillis) throws IOException, URISyntaxException{
    Path rootPath = Paths.get(rootFolder.toURI ());
    if(rootPath==null)
      throw new IOException ("Root Folder "+rootFolder.toURI ()+" not found");
    
    if(FileChecker.hasAFileChangedSince (rootPath, suffix, modifiedInLastMillis)){
      
      if(log.isDebugEnabled ())
        log.debug ("Reloading Probe Annotations from folder "+rootPath);
      
      try(DirectoryStream<Path> ds = Files.newDirectoryStream (rootPath, suffix)){
        
        context.truncate(Tables.MEV_PROBE_ANNOTATIONS).execute();        
        for(Path path : ds){
          loadUrlResource (path.toUri ().toURL ());
        }
      }
    }
  }
  
  public void loadUrlResource(URL url) throws IOException{
    if(log.isDebugEnabled ())
      log.debug ("Importing Probe Annotations file"+url);

    context.loadInto(MEV_PROBE_ANNOTATIONS)
    .onDuplicateKeyError ()
    .loadCSV(url.openStream ())
    .fields(MEV_PROBE_ANNOTATIONS.fields ())
    .separator ('\t')
    .ignoreRows (1)    
    .execute();
  }

}
