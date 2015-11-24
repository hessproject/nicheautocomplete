var autocomplete = angular.module('autocomplete',[]);

autocomplete.controller('autocomplete-controller', function($scope){
    //Variables
    $scope.searchData = {}; 
    $scope.totalResults = 0;
    $scope.searchQuery = ""; //Current contents of search input
    $scope.resultsToDisplay = 10; //Arbitrary number, can be set at however many results you'd like to display
    $scope.resultIndex = -1; //Index of selected <li> for arrow key navigation
    $scope.indexUpperBound = -1; //Maximum possible index of selectable <li>

    //Function fires on change to search input
    $scope.update = function(){
        $scope.resultIndex = -1;
        if ($scope.searchQuery.length > 0){
            $scope.getResults($scope.searchQuery);
        } else {
            $scope.clearResults();
        }
    }

    //Populate the autocomplete with results from web service
    $scope.getResults = function(query){
        var url = 'http://niche-recruiting-autocomplete.appspot.com/search/?query=' + query;
        JSONPUtil.LoadJSONP(url,function(res){
            if($scope.searchQuery == query){ //needed because web service was resolving calls after searchQuery had already changed
                $scope.searchData = res;    
                $scope.totalResults = res.total;
                if ($scope.totalResults > $scope.resultsToDisplay){
                    $scope.indexUpperBound = $scope.resultsToDisplay - 1;
                } else {
                    $scope.indexUpperBound = $scope.totalResults - 1;
            }
            $scope.$apply();
            }
        })
    }

    //Clear the search data, reset keyboard navigation
    $scope.clearResults = function(){
        $scope.searchData = {};
        $scope.totalResults = 0;
        $scope.indexUpperBound = -1;
    }

    //Up+Down arrows and Enter Key functions
    $scope.keyNavigation = function($event){
        var keyCode = $event.keyCode;
        switch(keyCode){
            case 38: //up arrow key
                $event.preventDefault();
                if($scope.resultIndex > -1){
                    $scope.resultIndex--;
                } else {
                    $scope.resultIndex = $scope.indexUpperBound;
                }
                break;
            case 40: //down arrow key
                $event.preventDefault();
                if($scope.resultIndex < $scope.indexUpperBound){
                    $scope.resultIndex++;
                } else {
                    $scope.resultIndex = -1;
                }
                break;
            case 13: //enter key
                if($scope.resultIndex > -1 && $scope.searchData != {}){
                    window.location.assign($scope.searchData.results[$scope.resultIndex].url);
                }
                break;
            default: break;
        }
    }
});
