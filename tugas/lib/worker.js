// model worker here


function register(data){
    try {
        const worker = {        
            name: data.name,
            address: data.address,
            email: data.email,
            phone: data.phone,
            biografi: data.bio,
            photo: data.photo,
        }
        return;
    } catch (error) {
        throw error
    }
}

function listWorker(){
    try {
        
        const workers = [{        // anggap bentuk data yang diperoleh dari model
            name: 'data.name',
            address: 'data.address',
            email: 'data.email',
            phone: 'data.phone',
            biografi: 'data.bio',
            photo: 'data.photo',
        }]
        return workers
    } catch (error) {
        throw error
    }
}

function removeWorker(id) {
    try {
        // model delete here
        return;

    } catch (error) {
        throw error
    }
}

module.exports = {register,listWorker,removeWorker}