(function($) {
    class Note {
        brief;
        researchProblem;
        hypothesis;
        method;
        dataset;
        experimentResult;
        advantages;
        disadvantages;
        opinion;

        constructor(noteStr, status) {
            let advantagesStr, disadvantagesStr;

            if (status !== "Unreviewed" && status !== "Viewed") {
                status = "Unread";
            }

            if (status === "Unreviewed" || status === "Unread") {
                [this.brief, this.researchProblem, this.hypothesis, this.method, this.dataset,
                    this.experimentResult, this.advantages, this.disadvantages, this.opinion] =
                    Array(9).fill(status);
            } else {
                const noteDiv = noteStr
                    .match(/(?<=<div data-schema-version="."><p>Annotation<\/p>)(.+?)(?=<\/div>)/g);

                if (noteDiv !== null) {
                    [this.brief, this.researchProblem, this.hypothesis, this.method, this.dataset,
                        this.experimentResult, advantagesStr, disadvantagesStr, this.opinion] =
                        noteDiv[0].match(/(?<=<p>)(.*?)(?=<\/p>)/g);
                    this.advantages = "● " + advantagesStr.substr(5).split(". ").join("\n● ");
                    if (disadvantagesStr.length > 5) {
                        this.disadvantages = "● " + disadvantagesStr.substr(5).split(". ").join("\n● ");
                    } else {
                        this.disadvantages = ""
                    }

                } else {
                    [this.brief, this.researchProblem, this.hypothesis, this.method, this.dataset,
                        this.experimentResult, this.advantages, this.disadvantages, this.opinion] =
                        Array(9).fill(status);
                }
            }
        }
    }

    function renderTable(data) {
        // define data array
        const tableData = $.csv.toObjects(data).filter(row => row["Manual Tags"] === "Viewed").map(row => {
            const note = new Note(row["Notes"], row["Manual Tags"]);
            return {
                title: row["Title"],
                year: row["Publication Year"],
                brief: note.brief,
                researchProblem: note.researchProblem,
                hypothesis: note.hypothesis,
                method: note.method,
                dataset: note.dataset,
                experimentResult: note.experimentResult,
                advantages: note.advantages,
                disadvantages: note.disadvantages,
                opinion: note.opinion
            }
        }).filter(row => !["Unread", "Unreviewed"].includes(row.brief));

        console.log("My Library.csv Loaded")

        // initialize table
        const table = new Tabulator("#table", {
            data: tableData,
            columns: [
                {title: "Title", field: "title", formatter: "textarea", headerSort: false},
                {title: "Year", field: "year"},
                {title: "Brief", field: "brief", formatter: "textarea", headerSort: false},
                {title: "Research Problem", field: "researchProblem", formatter: "textarea", headerSort: false},
                {title: "Hypothesis/Motivation", field: "hypothesis", formatter: "textarea", headerSort: false},
                {title: "Method", field: "method", formatter: "textarea", headerSort: false},
                {title: "Dataset", field: "dataset", formatter: "textarea", headerSort: false},
                {
                    title: "Experiment Result", field: "experimentResult", formatter: "textarea", headerSort: false
                },
                {title: "Advantages", field: "advantages", formatter: "textarea", headerSort: false},
                {title: "Disadvantages", field: "disadvantages", formatter: "textarea", headerSort: false},
                {title: "Opinion", field: "opinion", formatter: "textarea", headerSort: false}
            ],
            columnMaxWidth: 216.5,
            layout: "fitData"
        });
    }

    $.get("/data/My Library.csv", renderTable)
})(jQuery)