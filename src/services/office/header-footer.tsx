   export function insertHeaderFooter(header: string, footer: string, nr:string, title:string, owner: string, version:string) {
    if (typeof Word != 'undefined') {
        // Run a batch operation against the Word object model.
        Word.run(function (context) {

            // Create a proxy sectionsCollection object.
            var mySections = context.document.sections;

            // Queue a commmand to load the sections.
            context.load(mySections, 'body/style');

            // Synchronize the document state by executing the queued-up commands, 
            // and return a promise to indicate task completion.
            return context.sync().then(function () {

                // Create a proxy object the primary header of the first section. 
                // Note that the header is a body object.
                var myHeader = mySections.items[0].getHeader("primary");
                var myFooter = mySections.items[0].getFooter("primary");

                header = header.replace("{nr}", nr);
                header = header.replace("{title}", title);
                header = header.replace("{owner}", owner);
                header = header.replace("{version}", version);
                             
                // Queue a command to insert text at the end of the header.
                myHeader.insertHtml(header, Word.InsertLocation.replace);
                // Queue a command to wrap the header in a content control.
                myHeader.insertContentControl();

                footer = footer.replace("{nr}", nr);
                footer = footer.replace("{title}", title);
                footer = footer.replace("{owner}", owner);
                footer = footer.replace("{version}", version);
                
                // Queue a command to insert text at the end of the header.
                myFooter.insertHtml(footer, Word.InsertLocation.replace);
                // Queue a command to wrap the header in a content control.
                myFooter.insertContentControl();

                // Synchronize the document state by executing the queued-up commands, 
                // and return a promise to indicate task completion.
                return context.sync().then(function () {
                    console.log("Added a header to the first section.");
                });
            });
        })
        .catch(function (error) {
            console.log('Error: ' + JSON.stringify(error));
            if (error instanceof OfficeExtension.Error) {
                console.log('Debug info: ' + JSON.stringify(error.debugInfo));
            }
        });
      }
    }


    export function clearHeader() {
        // Run a batch operation against the Word object model.
        Word.run(function (context) {

            // Create a proxy sectionsCollection object.
            var mySections = context.document.sections;

            // Queue a commmand to load the sections.
            context.load(mySections, 'body/style');

            // Synchronize the document state by executing the queued-up commands, 
            // and return a promise to indicate task completion.
            return context.sync().then(function () {

                // Create a proxy object the primary header of the first section. 
                // Note that the header is a body object.
                var myHeader = mySections.items[0].getHeader("primary");

                // Queue a command to insert text at the end of the header.
                myHeader.clear();

                // Queue a command to wrap the header in a content control.
                // myHeader.insertContentControl();

                // Synchronize the document state by executing the queued-up commands, 
                // and return a promise to indicate task completion.
                return context.sync().then(function () {
                    console.log("Cleared header in first section.");
                });
            });
        })
        .catch(function (error) {
            console.log('Error: ' + JSON.stringify(error));
            if (error instanceof OfficeExtension.Error) {
                console.log('Debug info: ' + JSON.stringify(error.debugInfo));
            }
        });
    }


