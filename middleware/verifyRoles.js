const verify_Roles= (req,res,next)=>{
    const role= req.role;
   try {
    if(role==='admin'){
        return res.status(403).json({message:'you are a admin'});
        
       
    }
    else if(role==='teacher')
    {
        return res.status(403).json({message:'you are a teacher'});
        
        
    }
    else{
        return res.status(403).json({message:'you are a staff'});
        
        
    }
    
     
   } catch (error) {
       return res.status(500).json({message:'something went wrong'});
   }
}

module.exports = verify_Roles;