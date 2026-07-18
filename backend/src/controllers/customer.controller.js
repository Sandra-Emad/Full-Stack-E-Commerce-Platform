class CustomerController{

    async dashboard(req,res){

        return res.status(200).json({

            success:true,

            message:"Welcome Customer"

        });

    }

}

export default new CustomerController();