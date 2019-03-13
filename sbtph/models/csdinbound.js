const database = require('../util/database')

module.exports = class Inbound {
    
    static fetchAll(log,receive_calls) {
        const loginDirection = log
        const sql = `SELECT * FROM  csdinbound WHERE receive_calls=${receive_calls}`;
       return database.execute(sql).then((rows, fields) => {
        return rows[0]
        
       }).then(async(rows) => {
        const getCurrentRows = [...rows]
          for (let i=0 ; i<rows.length; i++){
            await durationCalc(rows[i].extension,loginDirection).then(hours => {
               getCurrentRows[i].loginHours = hours
            })
        
        }
        
         return getCurrentRows
       })

       function durationCalc(exten,login) {
        const sql = `SELECT * FROM logs WHERE log='${login}' AND extension=${exten} ORDER by timestamp DESC LIMIT 1`
        return database.execute(sql).then((rows,fields) => {
            const lastLogin = rows[0][0].timestamp
    
            const getCurrentTimestamp = Date.now()
            const lastLoginInMilsec = new Date(lastLogin)
            const theDifference = new Date (getCurrentTimestamp - lastLoginInMilsec.getTime())

            const hours = Math.floor(theDifference.getTime()/1000/3600)
            const minutes = Math.floor((theDifference.getTime()/1000/60) % 60)
            const sec = Math.floor((theDifference.getTime()/1000) % 60)  

            const loginHours = `${hours}:${minutes}:${sec}`
         
            return loginHours;

            }).catch(err => console.log(err))
        }
     
    }
    static getLoginLogoutDetails(extension) {
        const sql = `SELECT * FROM  logs WHERE extension=${extension}  ORDER BY timestamp DESC`
        return database.execute(sql).then((rows,fields) => {
            return rows[0]
        })
    }
    static callSummary(date) {
        const getDate = date
        const sql = "SELECT * FROM csdinbound"
        return database.execute(sql).then((rows,fields) => {
            return rows[0]
        }).then(async(rows) =>{
            let getCurrentrows = [...rows]
            for (let i=0;i<rows.length;i++){
                await callDuration(getDate,rows[i].extension).then(summary => {
                    getCurrentrows[i].summary = summary
                })

            }
            return getCurrentrows
        }).catch(err => console.log(err))

        function callDuration(date,extension) {
            const sql = `SELECT StartTimeStamp,EndTimeStamp FROM inbound_callstatus WHERE getDate='${date}' AND CallStatus='ANSWER'  AND WhoAnsweredCall=${extension}`
            return database.execute(sql).then((rows,fields) => {
                return rows[0]
            }).then(async(rows) => {
                let summary = {}
                let totalduration = [];
                for (let i=0; i<rows.length; i++) {             
                     totalduration[i] = await  (stringToTimeStamp(rows[i].EndTimeStamp) - stringToTimeStamp(rows[i].StartTimeStamp))
                }
                if (rows === 'undefined' || rows.length === 0){
                    summary.totalduration = 0
                   summary.totalCallAnswer = 0
                }else{
                 //add all elements in array
                totalduration = totalduration.reduce((accumulator,currentValue) => accumulator + currentValue)
                summary.totalduration = totalduration
                summary.totalCallAnswer = rows.length
               // console.log(summary)
                }
                
                return summary
            }).then(summary => {
                const hours = Math.floor(summary.totalduration/1000/3600)
                const minutes = Math.floor((summary.totalduration/1000/60) % 60)
                const sec = Math.floor((summary.totalduration/1000) % 60)  
        
                const totalduration = `${hours}:${minutes}:${sec}`
                 summary.totalduration = totalduration
                return summary;
            }).catch(err => console.log(err))
        
            function stringToTimeStamp(datestring){
                //let separate = str.split("-")
                let getyear = datestring.slice(0,4)
                let getmonth = datestring.slice(4,6)
                let getday = datestring.slice(6,8)
                let gethours = datestring.slice(9,11)
                let getmins = datestring.slice(11,13)
                let getsec = datestring.slice(13)
                
                
                let getdateAndTime = `${getyear}-${getmonth}-${getday} ${gethours}:${getmins}:${getsec}`
                let timestamp = new Date(getdateAndTime)
               // console.log( timestamp.getTime())
                return timestamp.getTime()
            }
        }
        
    } 
    static  getAgentCallDetails(extension, date) {
       const  sql = `SELECT * FROM  inbound_callstatus WHERE WhoAnsweredCall=${extension} AND getDate='${date}' `
        return database.execute(sql).then((rows, fields) => {
            return rows[0]
        }).then(async(rows) => {
            let summary = {}
            let totalduration;
            const getCurrentRows = [...rows]
            for(let i=0; i<rows.length; i++){
              totalduration = await  (stringToTimeStamp(rows[i].EndTimeStamp).getTime - stringToTimeStamp(rows[i].StartTimeStamp).getTime)
              const hours = Math.floor(totalduration/1000/3600)
              const minutes = Math.floor((totalduration/1000/60) % 60)
              const sec = Math.floor((totalduration/1000) % 60)  
        
              rows[i].totalduration = `${hours}:${minutes}:${sec}`
              rows[i].startTime = stringToTimeStamp(rows[i].StartTimeStamp).toLocaleTimeString
              rows[i].endTime = stringToTimeStamp(rows[i].EndTimeStamp).toLocaleTimeString
            }
            
            return rows
        }).catch(err => {
            console.log(err)
        })

        function stringToTimeStamp(datestring){
            const objectTime = {}
            //convert format of timestamp from 20181204-010850 TO 2018-11-24 09:15:00
            let getyear = datestring.slice(0,4)
            let getmonth = datestring.slice(4,6)
            let getday = datestring.slice(6,8)
            let gethours = datestring.slice(9,11)
            let getmins = datestring.slice(11,13)
            let getsec = datestring.slice(13)
            
            
            let getdateAndTime = `${getyear}-${getmonth}-${getday} ${gethours}:${getmins}:${getsec}`
            let timestamp = new Date(getdateAndTime)
       

            objectTime.toLocaleTimeString = timestamp.toLocaleTimeString()
            objectTime.getTime = timestamp.getTime()

            return objectTime
            
        }

    }


  





}