const fs = require('fs/promises');
const promptSync = require('prompt-sync');

const prompt = promptSync();

const exitProgram = (message) => {
    console.log('\nERROR: ' + message);
    process.exit(1).end();
}

const aggregateTextFiles = async () => {
    const inputDir = prompt('Please enter the full path to the log file folder: ')
    let fileNames = []

    const checkForValidInputDir = async () => {
        inputDir !== '' ? null : exitProgram('No file path entered. Please enter a valid file path. Exiting.')

        await fs.access(inputDir)
            .then(() => null)
            .catch(() => exitProgram('Not a valid path. Path looks like (ex. C:/Users/TrevorLichfield/Downloads/Logs). Exiting.'))
    }

    const checkForEmptyDir = async () => {
        let contents = await fs.readdir(inputDir, { withFileTypes: true })
        // filter out folders
        let filteredContents = []
        contents.forEach((file) => file.isDirectory() ? null : filteredContents.push(file))
        // check length after filtered
        filteredContents.length === 0 ? exitProgram("Directory Empty, exiting") : null;
    }
    
    const createNewLogFile = async () => {
        const logFileExists = await fs.readFile(newLogFilePath)
            .then(() => true)
            .catch(() => false)

        const createFile = async () => {await fs.writeFile(newLogFilePath, '')}

        if (logFileExists) {
            const userInput = prompt(`A log file by the name ${newLogFileName} already exists, do you want to override? (y/n): `)

            if (userInput === 'y') {
                console.log('Overwriting log file'); await createFile();   
            } else {
                console.log("Exiting."); process.exit(1).end();
            }
        } else {
            console.log("No log file exists, creating...."); await createFile()
        }
    }

    const readFilesInDir = async () => {
        let files = []


        const readDirectoryContents = async () => {
            files = await fs.readdir(inputDir, { withFileTypes: true })
                .catch((err) => console.error(err.message))
                .then(console.log("File Names Parsed"));
        }

        const addPathToFiles = async () => {
            let filesWPath = []
            files.map((file) => {
                if (file.name == newLogFileName) {
                    return
                } else if (file.isDirectory() == true) {
                    console.log(file.name + ' is a directory; Skipping.');
                } else {
                    filesWPath.push(`${inputDir}/${file.name}`);
                }
            });
            files = filesWPath
        }

        try {
            await readDirectoryContents()
            await addPathToFiles()
            fileNames = files
        } catch (err) {
            console.log(err.message)
        }
    }
    
    const combineFileContents = async (fileNames) => {
        fileNames.forEach(async (file) => {
            console.log(`Appending file [${file}] to new log file`)
            const fileContents = await fs.readFile(file)
            await fs.appendFile(newLogFilePath, fileContents)
            await fs.appendFile(newLogFilePath, '\n')
        })
    }

    await checkForValidInputDir();
    await checkForEmptyDir();

    const newLogFileName = await prompt('Enter a name for your new text file (ex. aggregate.txt): ')
    const newLogFilePath = `${inputDir}/${newLogFileName}`

    await createNewLogFile();
    await readFilesInDir();
    await combineFileContents(fileNames);
    
};

aggregateTextFiles()