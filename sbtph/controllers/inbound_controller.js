const express = require('express')
const database = require('../models/csdinbound')

exports.getIndex = (req,res,next) => {
    database.getAgentCallDetails(6364,'2019-03-14').then(result => console.log(result))
    res.render('index', {
        title: 'Home Page',
        path: '/',
        
    })
}

exports.getActive = (req,res,next) => {
    const recieve_calls = 1
    const login = 'IN'
    database.fetchAll(login,recieve_calls).then(rows => {
        res.render('active', {
            title: 'Active CSD',
            path: '/active',
            csd : rows
        })
    })
        
}

exports.getInactive = (req,res,next) => {
    const recieve_calls = 0
    const login = 'OUT'
    database.fetchAll(login,recieve_calls).then(rows => {
        res.render('inactive', {
            title: 'Inactive CSD',
            path: '/inactive',
            csd : rows
        })
    })
}   

exports.getLoginLogoutDetails = (req,res,next) => {
    const extension = req.query.extension
    const username = req.query.username
   database.getLoginLogoutDetails(extension).then(details => {
    res.render('loginlogoutdetails', {
        title: 'loginlogoutdetails',
        path: '/loginlogoutdetails',
        extension : extension,
        username: username,
        details: details
    })
   })
  
}

exports.callSummary = (req,res,next) => {
    let getdate;
    if(  req.query.getdate === undefined){
        getdate = new Date()
        let year = getdate.getFullYear()
        let month = getdate.getMonth()+1
        let day = getdate.getDate()
        getdate = `${year}-0${month}-${day}`
       
    }else{
        getdate = req.query.getdate
    }
    console.log(getdate)
    database.callSummary(getdate).then(summary => {
        res.render('call_summary', {
            title: 'Call Summary',
            path: '/call_summary',
            csd: summary,
            date: getdate
        })
    })    
}

exports.getAgentCallDetails = (req,res, next) => {
    let extension = req.query.extension
    let username = req.query.username
    let getdate = req.query.getdate

    //convert date format From YYYY-MM-DD To YYYYMMDD
    let slice_date = `${getdate.slice(0,4)}${getdate.slice(5,7)}${getdate.slice(8)}`
    database.getAgentCallDetails(extension,getdate).then(details => {
        res.render('agent_call_details', {
            title: 'Agent Call Details',
            path: '/agent_call_details',
            username: username,
            extension: extension,
            date : getdate,
            slice_date : slice_date,
            csd: details
        })
    })
    
} 