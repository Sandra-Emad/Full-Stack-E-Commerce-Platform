class AdminController {

    async dashboard(req,res){

        return res.status(200).json({

            success:true,

            message:"Welcome Admin"

        });

    }

    async products(req,res){

        return res.status(200).json({

            success:true,

            message:"Admin Products"

        });

    }

}

export default new AdminController();