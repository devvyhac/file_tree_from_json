const fs = require('fs');
const path = require('path');

// this function handles the folder and file creation
const fileHandler = (data) => {

    // trying to handle any exception that may occur below here
    try{

	// looping through all the items in the JSON Data
	for (item of data){

	    // checking if the current item is a DIRECTORY
	    if (item.type === 'DIRECTORY'){
		
		// checking if the directory exists
		if (fs.existsSync(item.name)) continue;

		// creating the directory it it doesn't exist
                fs.mkdirSync(item.name);

		// entering each created directory
	        process.chdir(item.name);

	    // checking if the current item is a FILE
	    } else if (item.type === 'FILE'){
		    
		// converting the data back to JSON again
	        let  rewriteData = JSON.stringify(data, null, 2);

		// writing the JSON data to the last FILE
		fs.writeFileSync(item.name, rewriteData, "utf8");                        

	    }
	}

	// Logging some feedback to the user in the console
	console.log('\n[+] Operation Successful');
	console.log(`\n[+] The JSON data has been sorted and saved in the directory below \n\n-> [ ./${data[0].name}/${data[1].name}/${data[2].name}/${data[3].name}/${data[4].name} ] <- `);

    // handling any exception that may occur from the TRY  above
    } catch (error) {

	console.log(error);

    }

};

// this function is used to SORT the JSON data in ascending order (linear sort)
const compare = (prev, next) => {

    let comparison = null;

    if (prev.id > next.id) comparison = 1;
    else if(next.id > prev.id) comparison = -1;

    return comparison;

}

// main function. It is the entry function to the program
const mainOperation = () => {

    // trying to anticipate an exception again
    try{

	// turning the JSON data to a JS object so I can work with it.
        const data = JSON.parse(fs.readFileSync('./task.json', 'utf8'));

	// sorting the data by passing the compare function as argument
	data.sort(compare);
	
	// invoking the FILE HANDLER method with the sorted data as argument
	fileHandler(data);
        
    // handling any exception occuring from the TRY above
    } catch (error) {

	console.log(error);

    }

}

// invoking the main method
mainOperation();

