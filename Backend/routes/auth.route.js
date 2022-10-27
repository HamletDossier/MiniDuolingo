import express from 'express';
const router = express.Router();

router.get("/login", (req,res) => {
	res.json({'ok':'loging'});
});

router.get('/register',(req,res)=>{
	res.json({'ok':true});
});

export default router;