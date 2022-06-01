'use strict';

/*
einbinden ins Project 

let deliveryCalender = new Calender('red')

    document.querySelector('body').appendChild(deliveryCalender.HtmlCalender) 
    document.querySelector('body').onclick =(evt)=> {
        let event = deliveryCalender.listen(evt)
        console.log(event)
    }
*/

/**
 * sectionWith = 'fit-content' 
 * sectionHeight = 'fit-content'
 * sectionColor = 'white'
 * sectionText = 'center'
 * thPadding = '5% 0'
 * thFontSize = '2rem'
 * tdBorder = '2px solid white'#
 * tdPadding = '5px'
 * tdCurrentDayRadius = '0%'
 * setEvents( { date: '17.05.2022', massage: 'Katz füttern ' } )
 * 
 */
export class Calender {
  constructor(eventColor = 'yellow') {
    this.language = 'en';

    this.date = new Date();
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth();
    this.showMonth = this.month

    this.eventColor = eventColor;
    this.showPerMonthQuerys = this.getQueryInMonth(this.month,this.year)
    this.tableID = 'calender'
    this.sectionId = 'calender-section'

    this.sectionWith = 'fit-content' 
    this.sectionHeight = 'fit-content'
    this.sectionColor = 'black'
    this.sectionText = 'center'
    this.sectionRem = '1.5rem'

    this.thPadding = '5% 0' 
    this.thFontSize = this.sectionRem.length === 0? this.sectionRem+0.5 : '2rem'

    this.tdBorder = '2px solid black'
    this.tdPadding = '5px'  
    this.tdCurrentDayRadius = '0%'

    this.width = '100%';
    this.height = '100%';

    this.events = [{ date: '02.01.2022', massage: 'Katze füttern ' }];

    this.dayName = {
      en: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      de: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    };

    this.month3letterCode = {
      en: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      de: [
        'Jan',
        'Feb',
        'Mär',
        'Apr',
        'Mai',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Okt',
        'Nov',
        'Dez',
      ],
    };
    this.monthFullName = {
      en: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      de: [
        'Januar',
        'Februar',
        'März',
        'April',
        'Mai',
        'Juni',
        'Juli',
        'August',
        'September',
        'Oktober',
        'November',
        'Dezember',
      ],
    };

    this.currentQueryPerMonth = this.getQueryInMonth();
    this.HtmlCalender = this.createHtmlCalender(this.month);
    this.showLastMonth = this.month;

  }
  setLanguage(lang) {
    this.language = lang;
  }

  showEvent(evt) {
    let result = 'kein Event vorhanden'
    let events = this.events;
    let calenderDate = evt.target.id
    for (let eventIndex = 0; eventIndex < events.length; eventIndex++) {
      if (events[eventIndex].date === calenderDate) result = events[eventIndex]
    }
    return result
  }

  setEvents(event) {
    this.events.push(event);
    this.createHtmlCalender();
  }
  getAllEvents() {
    return this.events
  }
  deleteEvent(event) {
    let length = this.events.length;
    let date = this.events.date;

    for (let index = 0; index < length; index++) {
      if (event === date) this.events.splice(index, 1);
    }
  }
  getQueryInMonth(month = this.date.getMonth(),year = this.date.getFullYear()) {

    let date = new Date(year, month, 1);
    const dates = [];

    while (date.getMonth() === month) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return {
      startdayweek: dates[0].getDay(),
      date: dates[0],
      month: date.getMonth(),
      days: dates.length,
      weeks: Number((dates.length / 7).toFixed(1)),
    };
  }
  createWeekTr(month) {

    let PerMonth = this.getQueryInMonth(month)
    let dateString = this.date.toDateString();
    let dateArry = dateString.split(' ');
    let countDay = 1;

    let event = this.events
    let year = dateArry[3];
    let currentDay = Number(dateArry[2]);

    let weeksPerMonth = Math.ceil(PerMonth.weeks) + 1;
    let DaysPerMonth = PerMonth.days;
    let startdayweek = PerMonth.startdayweek;
    let startdayweekDone = false
    let array = [];

    for (let week = 1; week <= weeksPerMonth; week++) {
      let tr = document.createElement('tr');

      for (let day = 1; day <= 7; day++) {

        if (startdayweek === 0 && startdayweekDone === false) {
          if (day === 6) startdayweekDone = true
          let td = document.createElement('td');
          td.style.padding = this.tdPadding

          td.innerText = ''
          tr.appendChild(td)
          array.push(tr);

        } else if (startdayweekDone === false) {

          if (day === startdayweek - 1) startdayweekDone = true
          else if(day === 1 && startdayweek === 1 ) startdayweekDone = true
          let td = document.createElement('td');
          td.style.padding = this.tdPadding
          td.innerText = ''
          tr.appendChild(td)
          array.push(tr);

        } else {

          let td = document.createElement('td');
          td.style.padding = this.tdPadding
          td.style.border = this.tdBorder
          td.style.cursor = 'pointer'


          if (countDay <= DaysPerMonth) {

            if (countDay === currentDay && month === this.month) {
              td.style.border = '2px solid red';
              td.style.borderRadius = this.tdCurrentDayRadius;
            }

            td.innerText = countDay;
            let idmonth = this.showMonth+1
            td.id = `${countDay <= 9 ? '0' + countDay : countDay}.${idmonth <= 9 ? '0' + idmonth : idmonth }.${year}`;

                for (let eventIndex = 0; eventIndex < this.events.length; eventIndex++) {

                  if (this.events[eventIndex].date === td.id) {
                    td.style.backgroundColor = this.eventColor
                  }
                }
            
            tr.appendChild(td);
          } else {
            td.innerText = '';
            td.style.border = '0'

            tr.appendChild(td);
          }
          countDay++;
        }
        array.push(tr);
      }
    }
    return array;
  }

  createHtmlTableHeader (month){
    let monthName = this.monthFullName[this.language][month];

    let tr = document.createElement('tr');

    let thText = ['<', monthName, '>']
    tr.style.backgroundColor = 'green'
    let thId = ['previous', 'calender-month', 'next']

    for (let thData = 0; thData < 3; thData++) {
      let th = document.createElement('th');
      th.style.padding = this.thPadding
      th.style.fontSize = this.thFontSize
      if (thData === 1) th.setAttribute('colspan', '5');
      if (thData !== 1) th.style.cursor = 'pointer'
      th.innerText = thText[thData];
      th.id = thId[thData]
      tr.appendChild(th);
    }
    return tr
  }

  createHtmlCalender(month,inSection=true) {
    
    let table = document.createElement('table');
    table.id = this.tableID
    let tableHeader = this.createHtmlTableHeader(month)
    table.appendChild(tableHeader);

    for (let week = 1; week <= 1; week++) {
      let tr = document.createElement('tr');

      for (let nameDay = 0; nameDay < 7; nameDay++) {
        let td = document.createElement('td');
        td.style.padding = this.tdPadding
        td.innerText = this.dayName[this.language][nameDay];
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    let outputWeek = this.createWeekTr(month);
    table.append(...outputWeek);
    if(inSection){
      let section = document.createElement('section');
      
      section.style.color = this.sectionColor
      section.id = this.sectionId
      section.style.textAlign = this.sectionText
      
      if(this.sectionRem.length > 0 ) section.style.fontSize = this.sectionRem
      
      section.style.width = this.sectionWith
      section.style.height = this.sectionHeight
      
      section.appendChild(table)
      return section;
    }else{
      return table
    }
    
  }

  setOutputTable (content){
    
    document.getElementById('calender-section').innerHTML = ''
    document.getElementById('calender-section').appendChild( content )
  }

  listen (evt) {

    if (evt.target.localName === 'td' && evt.target.innerText > 0) {

      return this.showEvent(evt)
      
    } else if (evt.target.localName === 'th' && evt.target.id === 'next' && this.showMonth <= 10) {
      
      this.showMonth +=1 
      
      let nextMonth = this.createHtmlCalender(this.showMonth,false)
      this.setOutputTable( nextMonth )
      
    } else if (evt.target.localName === 'th' && evt.target.id === 'previous' && this.showMonth > 0) {
      
      this.showMonth -=1 
      
      let previousMonth = this.createHtmlCalender(this.showMonth,false)
      this.setOutputTable( previousMonth )
    }
  }

}
