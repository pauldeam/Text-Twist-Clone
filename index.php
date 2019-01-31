<?php

header('Content-Type: application/json');

    //this is the basic way of getting a database handler from PDO, PHP's built in quasi-ORM
    $dbhandle = new PDO("sqlite:scrabble.sqlite") or die("Failed to open DB");
    if (!$dbhandle) die ($error);
    
    
    //creating a rack of 7 random letters
    function generate_rack($n){
      $tileBag = "AAAAAAAAABBCCDDDDEEEEEEEEEEEEFFGGGHHIIIIIIIIIJKLLLLMMNNNNNNOOOOOOOOPPQRRRRRRSSSSTTTTTTUUUUVVWWXYYZ";
      $rack_letters = substr(str_shuffle($tileBag), 0, $n);
      
      $temp = str_split($rack_letters);
      sort($temp);
      return implode($temp);
    };
    
    //creating an object to send to client
    $myrack = new stdClass;
    $myrack->letters = generate_rack(6);
    $_SESSION['myrack'] = $myrack;
    
    
    //creating every possible combination of letters using $myrack
    $racks = [];
    for($i = 0; $i < pow(2, strlen($myrack->letters)); $i++){
    	$ans = "";
    	for($j = 0; $j < strlen($myrack->letters); $j++){
    		//if the jth digit of i is 1 then include letter
    		if (($i >> $j) % 2) {
    		  $ans .= $myrack->letters[$j];
    		}
    	}
    	if (strlen($ans) > 1){
      	    $racks[] = $ans;	
    	}
    }
    
    $racks = array_unique($racks); //eliminates duplicates
    
    
    $arrwords = [];
    foreach($racks as $z){
        if(strlen("$z") >= 3){ //gets words that are 3 letters or larger
            $query = "select words from racks where rack = '$z'"; //goes through the array $racks and picks out words
            $statement = $dbhandle->prepare($query);
            $statement->execute();
            
            $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        
            if ($results != NULL){ //prints out only if there are words/results
                
                $arrwords = array_merge($arrwords,explode('@@', $results[0]["words"]));
                
            }
            
        }
        
    }
    $myrack->words = $arrwords;
    echo json_encode($myrack);
    
    
?>