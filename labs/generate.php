<?php
	$options = array(
		$_GET["query"],
		$_GET["font"],
		$_GET["rainbow"],
		$_GET["crazy"],
		$_GET["no_need"],
	);

	$script_options = '"' . implode("\" \"", $options) . '"';

	$command = exec('python ./generate.py '.$script_options);
	// error_log($command);

	header('Content-type: application/json');
	echo $command;
?>
