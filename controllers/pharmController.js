const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Medicine = mongoose.model('Medicine');

router.get('/', (req, res) => {
    res.render("pharm/addOrEdit", {
        viewTitle: "ADD MEDICINE"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
});



function insertRecord(req, res) {
    var pharm = new Medicine();
    pharm.pname = req.body.pname;
    pharm.mname = req.body.mname;
    pharm.stock = req.body.stock;
    pharm.cost = req.body.cost;
    pharm.mobile = req.body.mobile;
    pharm.city = req.body.city;
    pharm.save((err, doc) => {
        if (!err)
            res.redirect('pharm/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("pharm/addOrEdit", {
                    viewTitle: "ADD MEDICINE",
                    pharm: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Medicine.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('pharm/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("pharm/addOrEdit", {
                    viewTitle: 'UPDATE MEDICINE DETAILS',
                    pharm: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

router.get('/list', (req, res) => {
    Medicine.find((err, docs) => {
        if (!err) {
            res.render("pharm/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving medicine list :' + err);
        }
    });
});

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'pname':
                body['pnameError'] = err.errors[field].message;
                break;
            case 'mname':
                body['mnameError'] = err.errors[field].message;
                break;
            case 'stock':
                body['snameError'] = err.errors[field].message;
                break;
            case 'cost':
                body['cnameError'] = err.errors[field].message;
                break;
            case 'mobile':
                body['monameError'] = err.errors[field].message;
                break;
            case 'city':
                body['cinameError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Medicine.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("pharm/addOrEdit", {
                viewTitle: "UPDATE MEDICINE DETAILS",
                pharm: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Medicine.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/pharm/list');
        }
        else { console.log('Error in  delete :' + err); }
    });
});



module.exports = router;