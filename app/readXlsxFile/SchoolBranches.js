const XLSX = require("xlsx");

const depSchool = XLSX.readFile(
  "B:/node js projects/studentPortal/ExcelFile/SchoolBranches.xlsx"
);

if (depSchool.SheetNames.length > 0) {
  depSchool.SheetNames.forEach((sheet) => {

    const rows=XLSX.utils.sheet_to_row_object_array(depSchool.Sheets[sheet])
    console.log("rows : ",rows)


    // const importRange = "A1:F100";
    // const headers = ["a", "b", "c","d","e","f","g","h","i"];
    // const data = XLSX.utils.sheet_to_json(depSchool.Sheets[sheet], {
    //   range: importRange,
    //   header: headers,
    // });
    // console.log(data);

    // depSchool.Sheets[sheet].forEach((record) => {
    //   console.log("recored : ", record);
    // }); /* end of forEach */

    
  }); /* end of forEach */
} else {
  console.log("you dont have any sheet ...");
} /* end of if */
