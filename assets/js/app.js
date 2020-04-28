var pos = 0, questionDiv, test_status, question, choice, choices, chA, chB, chC, correct = 0;
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;
var all = new Array(0);

function getStats(){
  fetch("https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total?country=Nigeria", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
      "x-rapidapi-key": "d0a34018e6mshc188a2d05bb1519p135141jsnf2c32903e929"
    }
  })
  .then(response => response.json())
  .then(data => {
    // console.log(data)
    if(data.statusCode == 200){
      document.getElementById('confirmed').textContent = data.data.confirmed;
      document.getElementById('discharged').textContent = data.data.recovered;
      document.getElementById('deaths').textContent = data.data.deaths;
    }
  })
  .catch(err => {
    console.log(err);
  });

    fetch("https://nigeria-covid-19.p.rapidapi.com/api/states", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "nigeria-covid-19.p.rapidapi.com",
      "x-rapidapi-key": "d0a34018e6mshc188a2d05bb1519p135141jsnf2c32903e929"
    }
  })
  .then(response => response.json())
  .then(data =>{
    // console.log(data)
    
    var edo = data.filter(state => state.States == "Edo")[0]
    document.getElementById('cases').textContent = edo.No_of_cases;
    document.getElementById('active').textContent = edo.No_on_admission;
    document.getElementById('relieved').textContent = edo.No_discharged;
    document.getElementById('deaths1').textContent = edo.No_of_deaths;

    // console.log(edo)

  })
  .catch(err => {
    console.log(err);
  });
}


function get(x){
    return document.getElementById(x);
}

function showSlide(n) {
  slides[currentSlide].classList.remove('active-slide');
  slides[n].classList.add('active-slide');
  currentSlide = n;
  
}

function startTest(){
    get("error").style.display = 'none';
    get("loader").style.display = 'grid';
    
    var url = "https://gdgcovidtracker.herokuapp.com/v1/questions"
    // var url2 = "/assets/js/app_data.json"
    fetch(url)
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        if(data.status == "success"){

            questions = data.questions;

            get("loader").style.display = 'none';
            showSlide(currentSlide);
           
        }
    }).catch(error => {
        get("loader").style.display = 'none';
        get("error").style.display = 'grid';
    });
}

function retry(){
    startTest();
}

function mailingList(){
  // after api call
  // call setCookie(covidtracker,true,360)
  fetch('https://gdgcovidtracker.herokuapp.com/v1/mailinglist',{
    method:"POST",
    body:JSON.stringify({
      fullname:document.getElementById('fullname').value,
      email:document.getElementById('email').value,
      age:document.getElementById('age').value,
      number:document.getElementById('number').value,
      gender:document.getElementById('gender').value,
      address:document.getElementById('address').value,
      location:"",
    })
  })
  .then(resp => resp.json())
  .then(data => {
    // console.log(data)
    if(data.status == 'success'){
      console.log(data)
      setCookie('covidtracker','true',360)
      goToQuestion();
    }
  })
  .catch(error => {
    console.log(error)
  })
  
}

function setCookie(name, value, days)
{
  if (days)
  {
    var date = new Date();
    date.setTime(date.getTime()+days*24*60*60*1000); // ) removed
    var expires = "; expires=" + date.toGMTString(); // + added
  }
  else
    var expires = "";
  document.cookie = name+"=" + value+expires+ ";"; // + and " added
  console.log(name+"=" + value+expires + ";")
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  var user = getCookie("covidtracker");
  if (user != "") {
    return true
  } else {
    return false
    // if (user != "" && user != null) {
    //   setCookie("username", user, 365);
    // }
  }
}

function renderQuestion(){
  questionDiv = get("quiz");
  if(pos >= questions.length){
    console.log(checkCookie())
    if(checkCookie()){
      showSlide(currentSlide+2)
    }else{
      showSlide(currentSlide+1)
    }
    // showSlide(currentSlide+1);
    pos = 0;
    correct = 0;
    const sum = all.reduce((a, b) => a + b, 0);
    scrollTop();

  if (sum === 0) {
      get("quiz-result").innerHTML = "<li>You're not experiencing any symptom of COVID-19.</li>";
  }
  else if(sum <= 2){
    get("quiz-result").innerHTML = "<li>You may be experiencing stress. Observe and Re-evaluate.</li>";
  }
  else if(sum >= 3 && sum <= 5 ){
    get("quiz-result").innerHTML = "<li>Hydrate properly and engage in proper personal hygiene.</li><li> Observe and Re-evaluate after 2 days.</li>";
  }
  else if(sum >= 6 && sum <= 12 ){
    get("quiz-result").innerHTML = "<li>Urgently Seek a consultation with a doctor.</li>";
  }else{
    get("quiz-result").innerHTML = "<li>Call NCDC Hotline xxxxxxxx</li>";
  }

    return false;
  }

  const widthbar = 100/questions.length;
  get("progress-bar").style.width = widthbar*(pos+1)+"%";
  get("question-info").innerHTML = "Question "+(pos+1)+" of "+questions.length;
  question = questions[pos].question;
  chA = questions[pos].point;
  chB = 0;
 
  questionDiv.innerHTML = "<p>"+question+"</p>";



                            
  questionDiv.innerHTML += `<div class='options'><label class="yes" for='c1'><input type='radio' style="display:none;" id="c1" onClick="checkAnswer()" name='choices' value="${chA}">Yes</label>
                            <label class="no" for='c2'><input type='radio' id="c2" onClick="checkAnswer()" style="display:none;" name='choices' value="${chB}">NO</label></div>`;


}
function scrollTop() {
    window.scrollTo(0, 0);
  }
function checkAnswer(){

   
  
  choices = document.getElementsByName("choices");
  for(var i=0; i<choices.length; i++){
    if(choices[i].checked){
      choice = choices[i].value; 
      
    }
  }

  all.push(parseInt(choice, 10));

  pos++;
  renderQuestion();
}




function goToQuestion(){
    renderQuestion();
    showSlide(currentSlide + 1);

}

function retakeTest(){
    all = new Array(0);
    scrollTop();
    renderQuestion();
    showSlide(currentSlide - 2);
}



window.addEventListener("load", startTest(), false);