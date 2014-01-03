<style type="text/css">

.fixed-height-analysis {
  height: 700px;
  overflow:auto;
  
}


</style>


<div class="row-fluid">

<div class="fixed-height-analysis">
  <div class="accordion" id="{{cluster.parentId}}" ng-repeat="cluster in previousHCLClusters">
    <div class="accordion-group">
    
	    <div class="accordion-heading">
	      <a class="accordion-toggle" data-toggle="collapse" data-parent="{{cluster.dataParent}}" href="{{cluster.href}}">
	        {{cluster.datar.type}} : {{cluster.name}} 
	      </a>
	    </div> <!-- End Heading Div -->
	    
	    <div id="{{cluster.divId}}" class="accordion-body collapse">
	      <div class="accordion-inner">
	      
	        <div class="row-fluid">
	          <div class="span12">
	          <button class="btn btn-success" ng-click="updateHeatmapData(cluster.name, cluster.datar)">
	          <i class='icon-chevron-left'></i> Apply to heatmap
	          </button>
	          </div>
	        </div>
	        <br>
	        <div class="row-fluid">
	          <div class="span12">
	            <div d3-Radial-Tree data="cluster.datar" diameter='400'></div> 
	          </div>
	        </div>
	        
	    </div> <!-- End Body Div -->
    
    </div> <!-- End Accordion Grouping -->
  </div> <!-- End Accordion Definition -->
  
  <div class="accordion" id="{{cluster.parentId}}" ng-repeat="limma in previousLimmaAnalysis">
    <div class="accordion-group">
    
	    <div class="accordion-heading">
	      <a class="accordion-toggle" data-toggle="collapse" data-parent="{{limma.dataParent}}" href="{{limma.href}}">
	        {{limma.datar.type}} : {{limma.name}}
	      </a>
	    </div> <!-- End Heading Div -->
	    
	    <div id="{{limma.divId}}" class="accordion-body collapse">
	      <div class="accordion-inner">
	            
	            <div class="row-fluid">
	            <div class="span12>
	            
		            <div class="row-fluid">
			            <button class="btn pull-right btn-success" >
			              <a href="/dataset/{{datasetName}}/analysis/{{limma.name}}?format=tsv">
			              <i class="icon-white icon-download"></i> Download
			              </a> 
			            </button>
			            
			            <div id="limmaResultsNotSignificant" ng-hide="limma.datar.significant">
			              <hr>
			              <p>No Significant values!</p>
			              
			            </div>
			            
			            <div id="showTableDialog" ng-hide="showLimmaTables">
			              <a href="" ng-click="expandRight()">Expand to see table...</a>
			            </div>
			            
			        </div>
		            
		            <div class="row-fluid">
			        	<div class="limma-table" id="limmaResultsTable" ng-hide="!limma.datar.significant || !showLimmaTables">
			        	
		                    <table class="table table-striped table-bordered">
		                            <thead>
		                                    <tr>
		                                      <th ng-repeat="header in ['ID', 'Log-Fold-Change', 'Average Expression', 'P-Value', 'Q-Value']">{{header}}</th>
		                                    </tr>
		                            </thead>
		                            <tbody>
		                                    <tr ng-repeat="row in limma.datar.significant">
		                                            <td>
		                                                    {{row["id"]}}
		                                            </td>
		                                            <td>
		                                                    {{row["logFoldChange"]}}
		                                            </td>
		                                            <td>
		                                                    {{row["averageExpression"]}}
		                                            </td>
		                                            <td>
		                                                    {{row["pValue"]}}
		                                            </td>
		                                            <td>
		                                                    {{row["qValue"]}}
		                                            </td>
		                                    </tr>
		                            </tbody>
		                    </table>
		                </div>
		            </div>
                
                </div> <!-- End Span -->
                </div> <!-- End Row -->
	        
	      </div>
	    </div> <!-- End Body Div -->
    
    </div> <!-- End Accordion Grouping -->
  </div> <!-- End Accordion Definition -->
  

</div> <!-- End fixed-height def -->

</div> <!-- End Row Definition -->
	
