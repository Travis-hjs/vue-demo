class ModuleGlobal {
    images = {
        logo: require("../assets/logo.png")    
    }
}

const Global = new ModuleGlobal();

export default Global;