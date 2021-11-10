const httpError = (res,err)=>{
    console.error(err)
    res.status(500)
    res.send({error: 'Algo ocurrio'})
}

module.exports = {httpError}