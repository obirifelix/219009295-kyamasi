const express = require('express');
const router = express.Router();
const User = require('../database__connections/User');
const { Patient, Payment } = require('../database__connections/Patient')

router.get('/', (req, res)=>{
    res.render('home');
});

router.get('/signin', (req, res)=>{
    res.render('signin')
});

router.post('/signin', (req, res)=>{
    const data = {
        username: req.body.username,
        password: req.body.password
    }
    User.findOne({username: data.username, password: data.password }).then((found)=>{
        if(found){
            return res.redirect('/dashboard')
        }
        res.redirect('back')
    }).catch((error)=>{ res.json({ msg:'🔐 Sorry - Invalid Credentials'})})
});


router.post('/createAdmin', (req, res)=>{
    const data = {
        username: req.body.username,
        password: req.body.password
    }
    User.findOne({username: data.username}).then((found)=>{
        if(found){
            return res.json({ msg:'🔐 Sorry - User already exist'})
        }
        User.create(data).then((newUser)=>{
            return res.redirect('/dashboard')
        })
    }).catch((error)=>{ res.json({ msg:'🔐 Sorry - Something went wrong try again later'})})
})

// Patients
router.get('/dashboard', (req, res)=>{
    Patient.find({}).then((patients)=>{
        if(patients){
            res.render('dashboard', {
                patients
            })
        }
    })
    .catch((error)=>{ res.send(error.message)})
});

router.post('/newPatient', (req, res)=>{
    const patientData = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        DateOfBirth : req.body.DateOfBirth,
        contact : req.body.contact,
        residentialAddress : req.body.residentialAddress,
        emergencyNo : req.body.emergencyNo
    }

    Patient.create(patientData).then((newPatient)=>{
        res.redirect('/dashboard')
    })
    .catch((error)=>{ res.send(error.send)})
});

router.get('/details/:id', (req, res)=>{
    Patient.findById({_id: req.params.id}).then((patient)=>{
       res.render('details',{
            patient
       }) 
    })
})



router.get('/delete/:id', (req, res)=>{
    Patient.findByIdAndDelete({_id: req.params.id}).then((deleted)=>{
        res.redirect('/dashboard')
    }).catch((error)=>{ res.send(error)})
});



router.get('/logout', (req,res)=>{
    res.redirect('/')
});
module.exports = router;