var resultFilter = []; // the displayed filters
var finalResultFilter = [];  // the filters with proper searchID

var resultIngredients = [];
var expectedFilter = ["Dairy-Free","Egg-Free","Gluten-Free","Peanut-Free","Seafood-Free", "Sesame-Free","Soy-Free", "Sulfite-Free","Tree Nut-Free","Wheat-Free", "Lacto vegetarian", "Ovo vegetarian", "Pescetarian","Vegan","Lacto-ovo vegetarian"];
var actualFilter = ["396^Dairy-Free","397^Egg-Free","393^Gluten-Free","394^Peanut-Free","398^Seafood-Free","399^Sesame-Free","400^Soy-Free", "401^Sulfite-Free", "395^Tree Nut-Free","392^Wheat-Free",  "388^Lacto vegetarian", "389^Ovo vegetarian", "390^Pescetarian","387^Lacto-ovo vegetarian"];
var timeFilterOn = false;
var dietFilterOn = false;
var sortingType;

var count =0;



$("document").ready(function() {
  var acc = document.getElementsByClassName("accordion");
  var i;
  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight){
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
});

$("document").ready(function(){
    $('#myInput').keypress(function(e){
      if(e.keyCode==13)
      $('#add').click();
    });
});

function addToCheckBox() {
  var ul = document.getElementById("ingredientCheckbox");
  var li = document.createElement("li");
  var val = $('#myInput').val();

  if (!/^[a-zA-Z\s-]*$/.test(val) || val == '') {
    $('#myInput').val('ERROR: Not a valid ingredient.').focus();
  }
  else {
    val = val.toLowerCase();
    if (resultIngredients.indexOf(val) > -1) {
      $('#myInput').val('ERROR: No duplicates.').focus();
    }
    else if (resultIngredients.length == 10) {
      $('#myInput').val('Max of 10 ingredients reached.').focus()
    }
    else { // only push if valid ingredient, not already in ingredients List && max not reached
     resultIngredients.push(val);
     li.onclick = function deleteItem() {
      this.parentNode.removeChild(this);
      var index = resultIngredients.indexOf(this.innerHTML);
      resultIngredients.splice(index,1);
     }
     li.appendChild(document.createTextNode(val));
     ul.appendChild(li);
     $('#myInput').val('').focus();
    }
  }
}

function addIngredient (ingredientID) {
  var filter = document.getElementById(ingredientID).value;
  if (resultIngredients.indexOf(filter) <= -1 && resultIngredients.length<10) {
    var li = document.createElement("LI");
    var textnode = document.createTextNode(filter);
    li.onclick = function deleteItem() {
      this.parentNode.removeChild(this);
      var index = resultIngredients.indexOf(this.innerHTML);
      resultIngredients.splice(index,1);
    }
    li.appendChild(textnode);
    document.getElementById("ingredientCheckbox").appendChild(li);
    resultIngredients.push(filter);
  }
}

function addTimeFilter(timeID) {
  //Limits time filter to 1 option
  if (timeFilterOn == false) {
    var li = document.createElement("LI");
    var filter = document.getElementById(timeID).value;
    var textnode = document.createTextNode(filter);
    li.onclick = function deleteItem() {
      this.parentNode.removeChild(this);
      var index = resultFilter.indexOf(this.innerHTML);
      resultFilter.splice(index,1);
      timeFilterOn = false;
    }
    li.appendChild(textnode);
    document.getElementById("filterSelection").appendChild(li);
    resultFilter.push(filter);
    timeFilterOn = true;
  }
}

function addDietFilter(dietID) {
  //Limits time filter to 1 option
  if (dietFilterOn == false) {
    var li = document.createElement("LI");
    var filter = document.getElementById(dietID).value
    var textnode = document.createTextNode(filter);
    li.onclick = function deleteItem() {
      this.parentNode.removeChild(this);
      var index = resultFilter.indexOf(this.innerHTML);
      resultFilter.splice(index,1);
      dietFilterOn = false;
    }
    li.appendChild(textnode);
    document.getElementById("filterSelection").appendChild(li);
    resultFilter.push(filter);
    dietFilterOn = true;
  }
}

function addGenericFilter(filterID) {
  var filter = document.getElementById(filterID).value
  if (resultFilter.indexOf(filter) == -1) {
    var li = document.createElement("LI");
    var textnode = document.createTextNode(filter);
    li.onclick = function deleteItem() {
      this.parentNode.removeChild(this);
      var index = resultFilter.indexOf(this.innerHTML);
      resultFilter.splice(index,1);
    }
    li.appendChild(textnode);
    document.getElementById("filterSelection").appendChild(li);
    resultFilter.push(filter);
  }
}

function createFinalResultFilter() {
  finalResultFilter = resultFilter.slice(0);
  var i;
  for (i = 0; i < expectedFilter.length; i++) {
    var j = finalResultFilter.indexOf(expectedFilter[i]);
    if (j != -1) { //
      finalResultFilter.splice(j,1,actualFilter[i])
    }
  }
  console.log(finalResultFilter);
}



function displayBanner(testCase) {
  var ing = ("\xa0\xa0\xa0Showing results for: \xa0").bold();
  var filter = ("\xa0\xa0\xa0Filters applied: \xa0").bold();
  var ingList = ing + resultIngredients.join(', ');
  var filterList = filter + resultFilter.join(', ');
  createFinalResultFilter();
  document.getElementById("bannerIngredients").innerHTML = ingList;
  document.getElementById("bannerFilters").innerHTML = filterList;
  document.getElementById("sortByList").selectedIndex = "0";
  document.getElementById("finalRecipes").innerHTML = ""; // Clears recipes from last generation
  var horz = document.createElement("HR");
  horz.style.width = "97%";
  horz.style.color = "#D0D0D0";
  document.getElementById("finalRecipes").append(horz);

  var container = document.getElementById("finalRecipes");
  var div, table, row, left, a, pic, right;
  var row1, linkText, p, row2, italicize, row2P, bold, boldText, row2Data, row3;


  for (i = 0; i < 10; i++) {
    // White rectangle
    div = document.createElement("div");
    div.style.background = "white";
    div.style.color = "black";
    div.style.margin = "1vw";
    div.style.width = "97%";
    div.style.overflow = "hidden";
    div.style.border = "2px solid #b3cccc";

    table = document.createElement("table");
    table.style.background = "white";
    table.style.height = "18vh";
    table.style.tableLayout = "fixed";
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
    table.style.margin = "0px 1vh 0px 0px" ;
    row = document.createElement("TR");

    // Left food image
    left = document.createElement("TD");
    left.style.width = '20%';
    a = document.createElement('a');
    a.setAttribute('href', testCase[i*6]); //SOURCEURL
    a.setAttribute('target', '_blank');
    pic = document.createElement('img');
    pic.setAttribute('src',testCase[(i*6)+1]); //IMAGEURL  recipeNum[1
    pic.style.objectFit = "cover";
    pic.style.margin = "1vh";
    pic.style.height = "16vh";
    pic.style.width = "20vh";
    pic.style.maxWidth = "100%";
    pic.style.maxHeight = "100%";
    left.style.textAlign = "center";
    a.append(pic);
    left.append(a);

    // Right pane
    right = document.createElement("TD");
    right.style.width = "80%";

    row1 = document.createElement("div");
    row1.style.marginTop = "-3vh";
    row1.style.fontWeight = "bold";
    row1.style.fontSize = "3vh";
    row1.style.height = "4vh";
    row1.style.borderLeft = "5px dotted orange";
    row1.style.paddingLeft = "5px";
    linkText = document.createTextNode(testCase[(i*6)+2]); //NAME
    a = document.createElement('a');
    a.setAttribute('href',testCase[(i*6)]); //SOURCEURL
    a.setAttribute('target', '_blank');
    a.appendChild(linkText);
    a.title = "Recipe Name";
    a.style.textDecoration = "none";
    a.style.color = "black";
    p = document.createElement ("p");
    pic = document.createElement('img');
    pic.setAttribute('src','https://image.freepik.com/free-icon/information-circular-button-ios-7-interface-symbol_318-36183.jpg');
    pic.setAttribute('title', 'INSERT RECIPE URL');
    pic.style.cursor = "help";
    pic.style.marginLeft = "1vh";
    pic.style.height = "2vh";
    pic.style.width = "2vh";
    p.style.height = "4vh";
    p.append(a);
    p.append(pic);
    row1.append(p);
    p.style.textOverflow = "ellipsis";
    p.style.overflow = "hidden";

    row2 = document.createElement("div");
    row2.style.marginTop = "1vh";
    row2.style.height = "5vh";
    italicize = document.createElement("I");
    row2P = document.createElement('span');
    row2P.style.display = "block";
    row2P.style.height = "2vh";
    bold = document.createElement('strong');
    boldText = document.createTextNode("INGREDIENTS: ");
    row2Data = document.createTextNode(testCase[(i*6)+3]); //INGRIENDTS
    row2P.style.verticalAlign = "middle";
    row2P.style.color = "grey";
    row2.style.textOverflow = "ellipsis";
    row2.style.overflow = "hidden";
    row2.style.fontSize = "2vh";
    bold.append(boldText);
    row2P.append(row2Data);
    italicize.append(row2P);
    row2.append(bold);
    row2.append(italicize);

    row3 = document.createElement("div");
    row3.style.marginTop = "1vh";
    row3.style.width = "100%";
    row3.style.height = "3vh";
    row3.style.display = "flex";

    row3A = document.createElement("div");
    bold = document.createElement('strong');
    boldText = document.createTextNode("COOKING TIME: ");
    row3AData = document.createTextNode(testCase[(i*6)+4]); //COOKING TIME
    row3A.style.padding = "0vh 10vh 0px 0px";
    row3A.style.height = "3vh";
    row3A.style.width = "50%";
    bold.append(boldText);
    row3A.append(bold);
    row3A.append(row3AData);
    row3A.style.fontSize = "2vh";
    row3A.style.textOverflow = "ellipsis";
    row3A.style.overflow = "hidden";

    row3B = document.createElement("div");
    bold = document.createElement('strong');
    boldText = document.createTextNode("RATING: ");
    row3BData = document.createTextNode(testCase[(i*6)+5]); //RATING
    row3B.style.height = "3vh";
    row3B.style.padding = "0vh 10vh 0px 10px";
    row3B.style.width = "50%";
    bold.append(boldText);
    row3B.append(bold);
    row3B.append(row3BData);
    row3B.style.fontSize = "2vh";
    row3B.style.textOverflow = "ellipsis";
    row3B.style.overflow = "hidden";
    row3.append(row3A);
    row3.append(row3B);

    right.append(row1);
    right.append(row2);
    right.append(row3);
    row.appendChild(left);
    row.appendChild(right);
    table.appendChild(row);
    div.appendChild(table);
    container.appendChild(div);
  }
}



function sort() {
  sortingType = document.getElementById("sortByList").selectedIndex;
  // x = Sort by method (0 = alphabetical, 1 = by rating; 2 = Prep Time (low to high))
}


function display() {
  count += 1;

  //sourceURL,imageURL,name,ingridents,time,rating
  if(count == 1){
    //MILK POTATOES ONIONS
    console.log("count==1: " +count)
    var testOne = [
      //recipe1
      'https://www.gimmesomeoven.com/scalloped-potatoes-recipe/',
      'https://lh3.googleusercontent.com/uIh8XfyeGavRAfWLCrV3XO51ApPVJjuVPIW0-GItZ0Cm83nFUudkkOoy3DPw_OjieYlowLCjMTgtqoAReVNFwQ=s360',
      'Scalloped Potatoes','butter,yellow onion,large garlic cloves,' +
      'flour,chicken stock,milk,kosher salt,black pepper,' +
      'fresh thyme leaves,yukon gold potatoes,sharp cheddar cheese,' +
      'grated parmesan cheese','80 min','4',

      //recipe2
      'https://www.centercutcook.com/loaded-baked-potato-casserole/',
      'https://lh3.googleusercontent.com/mwHiiq9DHQ4HV09wJGprJPDEj_FgMA0DrkEqWk6WGtyzqnENQgUxJHr0WmWWu4l7ckwx8nz9gmi1hEFew5_y3Tg=s360',
      'Loaded Baked Potato Casserole','yukon gold potatoes,water,potatoes,cream cheese,butter,' +
      'sour cream,milk,kosher salt,black pepper,' +
      'garlic powder,sharp cheddar cheese,bacon,green onions','60 min','4',

      //recipe3
      'https://www.fromvalerieskitchen.com/irish-colcannon-potatoes/',
      'https://lh3.googleusercontent.com/jK0x_EmS784JI2oiqyVqRuXLSMPyyWWz9A2ocIJjCQNJRT0d3mp-QrUQs6Ny1HYtS3JUWjGjfPcB2eNypr1N=s360',
      'Irish Colcannon Potatoes','red skinned potatoes,salt,butter,minced garlic,' +
      'green cabbage,fresh ground black pepper,milk,' +
      'onion powder,bacon,green onions','55 min','4',

      //recipe4
      'https://www.cookingclassy.com/creamy-potato-soup/"},"id":"Creamy-Potato-Soup-2225700',
      'https://lh3.googleusercontent.com/m8vW7HTsL0b0-a5VWEyAbkjB_P-zjql_XgdQ3zcs0UcmYezm-WZerWnvEM7eZCW3WC855QSnoZL5Iwe7vWgE=s360',
      'Creamy Potato Soup','russet potatoes,yellow onion,carrots,diced celery,' +
      'low sodium chicken broth,salt,' +
      'freshly ground black pepper,butter,flour,' +
      'milk,sour cream,crumbled bacon,' +
      'shredded cheddar cheese,green onions','60 min','4',

      //recipe5
      'https://www.spendwithpennies.com/scalloped-potatoes-recipe/',
      'https://lh3.googleusercontent.com/IbOcfJCiYvaq1_LvLX6dIy0yic5w50r6U5vL1Gp3HEJfGBteRwONmQr0mB7s0Mi-YRoEZS8CH0BP3DdKEYXP=s360',
      'Scalloped Potatoes','butter,onion,garlic,flour,milk,chicken broth,salt,pepper,potatoes','85 min','4',

      //recipe6
      'https://www.canadianliving.com/food/lunch-and-dinner/recipe/classic-scalloped-potatoes',
      'https://lh3.googleusercontent.com/JlnJfttTNM1fQThtOENIRBfFVVGSH6lU_5QlSlJnTN5ESrQK6sf0YKM8vFIliewAXWl4_eM_ajJ7iUPPYbt_=s360',
      'Classic Scalloped Potatoes','butter,garlic,all-purpose flour,' +
      'chopped fresh thyme,salt,pepper,milk,' +
      'yukon gold potatoes,small onion','105 min','3',

      //recipe7
      'https://www.bettycrocker.com/recipes/scalloped-potatoes/328145a6-db72-4258-b545-0589655fe23d',
      'https://lh3.googleusercontent.com/skhFEwvppgXofdl2a70B9QbT98LKyO3yG1yZA4mkRAiThubVNgCRm5mEg2trncPFwPUwcek25TfHn8Kx82MM=s360',
      'Scalloped Potatoes','butter,onion,all purpose flour,salt,pepper,milk,potatoes','125 min','3',

      //recipe8
      'https://www.awickedwhisk.com/twice-baked-potatoes/',
      'https://lh3.googleusercontent.com/w2SoglgHiLl6Bj-GdjVYsxykQvKEpRAb9Xr3HM3VyIHlTQ_26fMv1C-nGOPZO0p8A4tx89OLIUomSq_ccJsyXA=s36',
      'Quick Twice Baked Potatoes','russet potatoes,butter,shredded cheddar cheese,bacon,' +
      'green onions,sour cream,milk,salt,pepper','70 min','3',

      //recipe9
      'https://www.thekitchn.com/recipe-baked-potato-soup-with-bacon-scallions-cheddar-136303',
      'https://lh3.googleusercontent.com/XlUo_qOtKHKR3VanKkTRe6tKrRfqNXjQ5A4SDo1ALJPbN04DbXkyxTrIKleOVx7WfVDRPMOhmCn2kiKSqlNYZA=s360',
      'Baked Potato Soup With Bacon, Green Onion & Cheddar','unsalted butter,flour,whole milk,l' +
      'arge potatoes,bacon,shredded cheddar cheese,' +
      'sour cream,green onions,kosher salt,' +
      'ground black pepper,garlic,grated parmesan cheese','35 min','4',

      //recipe10
      'https://realmomkitchen.com/96/cheesy-scalloped-potatoes/',
      'https://lh3.googleusercontent.com/UFNpDz7t8CqAjImlKQF_7R3fwv0awoyjcc0MTgelLgWObxotrsF949wBsJHRiXfh4Wdk2V865eJpqgxHWKKx1g=s360',
      'Cheesy Scalloped Potatoes','chopped onion,butter,flour,milk,salt,shredded cheese,medium potatoes','85 min','4'
    ];

    displayBanner(testOne);
  }else if (count == 2){
    console.log("count==2: " +count)
    //var testTwo
    //displayBanner(testTwo);
  }else if (count == 3){
    console.log("count==3: " +count)
    //var testThree
    //displayBanner(testThree);
  }else {
    console.log("count==else: " +count)
  }

}


