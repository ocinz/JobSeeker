//Get Data
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "c69161d74amsh6cf7839b3513791p181b60jsn5455f27912fc",
    "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
  },
};

const getData = async (job, date) => {
  try {
    const response = await fetch(`https://jsearch.p.rapidapi.com/search?query=${job}&page=1&num_pages=1&date_posted=${date}`, options);

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

//Display Job
const displayJob = async (jobsData) => {
  const displays = document.getElementById("jobs");
  let jobs = ``;

  for (let i = 0; i < jobsData.data.length; i++) {
    const jobTitle = jobsData.data[i].job_title;
    const company = jobsData.data[i].employer_name;
    const logo = jobsData.data[i].employer_logo;
    const salary = jobsData.data[i].job_max_salary;

    const job = `<div class="job">
    <div class="logo"><img src="${logo}" alt="logo" /></div>
    <div class="center">
      <h2>${jobTitle}</h2>
      <h3>${company}</h3>
    <p>Description</p>
    </div>
    <h4>${salary}</h4>

  </div>`;
    jobs += job;
  }

  displays.innerHTML = jobs;
};

const searchJob = async () => {
  const jobInput = document.getElementById("job").value;
  console.log(jobInput);

  const j = document.getElementById("date").selectedIndex;
  const date = document.getElementsByTagName("option")[j].value;

  const jobData = await getData(jobInput, date);
  displayJob(jobData);
};
