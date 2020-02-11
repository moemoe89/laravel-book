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
		return '';
	}

	function checkArrInArr($a1, $a2) {
		return array_intersect($a2, $a1);
	}

