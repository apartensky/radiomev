define(["ng", "lodash"], function(ng, _){
	var module = ng.module("mui.views.dataset.analysis.genesd", [])	
	.factory("GeneSDVMFactory", ["$stateParams", "SigGenes", "alertService", function($stateParams, SigGenes, alertService){
		
		return function GeneSDVMFactory($scope, $stateParams, project, analysis){
			var _self=this;
			this.analysisId=$stateParams.analysisId;
			this.analysis=analysis;
			this.project=project;
			$scope.dataset=project.dataset;
			this.sigGenesTop = SigGenes(100, analysis.result.genes, analysis.result.sd, "SD");
//			$scope.filteredResultsTop = this.sigGenesTop;
			this.heatmapViewTop = project.generateView({
	            viewType:'heatmapView',
	            note: analysis.name+"_geneSDTop",
	            labels:{
	                row:{keys:this.sigGenesTop.keys}, 
	            }
	        });
			this.heatmapViewBottom = project.generateView({
	            viewType:'heatmapView',
	            note: analysis.name+"_geneSDBottom",
	            labels:{
	            }
	        });
			
            
			$scope.$on("ui:resultsTable:filteredResults", function($event, filteredResults){
				var labels = filteredResults.map(function(gene){return gene.geneId;});
				if($event.targetScope.id === _self.heatmapViewTop.id){					
					_self.filteredResultsTop = filteredResults;
					_self.heatmapViewTop = _self.heatmapViewTop.applyFilter("row", labels);
				}				
            });
		};
	}])
	.controller("GeneSDVM", ["$scope", "$stateParams", "project", "analysis", "GeneSDVMFactory",
	                        function($scope, $stateParams, project, analysis, GeneSDVMFactory){
		GeneSDVMFactory.call(this, $scope, $stateParams, project, analysis);
	}]);
	return module;
});