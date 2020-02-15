<?php

	function checkInArr($value, $array) {
		if (in_array($value, $array)) {
    		return $value;
		}
		return '';
	}

	function checkInSort($value) {
		$value = strtolower($value);
		$sort = ['asc', 'desc'];
		if (in_array($value, $sort)) {
    		return $value;
		}
		return 'desc';
	}

	function checkArrInArr($a1, $a2, $ambigious) {
		if ($ambigious != null) {
			for ($i = 0; $i < count($a1); $i++)  {
				if (array_key_exists($a1[$i], $ambigious)) {
				   $a1[$i] = $ambigious[$a1[$i]];
				}
        	}
		}
		$intersect = array_intersect($a2, $a1);
		if (count($intersect) ==0) {
			return $a2;
		} 
		return $intersect;
	}

	function toStrColumn($arr) {
		return implode (",", $arr);
	}
	

