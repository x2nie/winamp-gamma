// -------------------------------------------------------------------------
// App
// -------------------------------------------------------------------------
class App extends Component {
    // <!-- <LcdDisplay class="wz" value="'4,4.956'" /> -->
    static template = xml/*html*/`
    <div class="app">
        <svg width="381" height="216" style="outline: 1px solid red" xmlns="http://www.w3.org/2000/svg">
            <defs>
            <filter id="gamma"> 
                <feComponentTransfer>
                <feFuncR type="gamma" amplitude="0.5" exponent="0.3" offset="0.0" />
                <feFuncG type="gamma" amplitude="0.75" exponent="0.5" offset="0.0" />
                <feFuncB type="gamma" amplitude="1.5" exponent="0.7" offset="0.0" />
                <!-- <feFuncA type="gamma" amplitude="1" exponent="1" offset="0.0" /> -->
                </feComponentTransfer>
            </filter>
            </defs>

            <!-- <image xlink:href="http://www.vanseodesign.com/blog/wp-content/uploads/2013/09/strawberry-fields.jpg" width="660" height="495" filter="url(#gamma)" /> -->
            <image href="static/img/Bgoverlay.png" gammagroup="Backgrounds"/>
            <image href="static/img/Display.png" x="53" y="9" filter="url(#gamma)" gammagroup="Display"/>
            <image href="static/img/thinger.png" x="45" y="109" gammagroup="Thinger"/>
            <image href="static/img/front.png"  x="34" y="0" gammaGroup="Frontcover"/>
        </svg>
    </div>`;

    constructor() {
        super(...arguments);
        this.state = useState({ word: 'Hello', value: '1234' });
        this.editorContext = useContext(this.env.editorContext);
        // JSON.stringify()
        var self = this;
        // fetch(`/data/${this.last_stamp}`)
        // fetch(`/data`)
        // fetch(`/agent/data.json`)
        //     .then(function (response) {
        //         // The API call was successful!
        //         return response.json();
        //     }).then(function (ret) {
        //         if(ret) {
        //             self.env.editorContext.state.animations = ret.animations;
        //             // self.state.character = ret.character;
        //             self.env.editorContext.state.charInfo = ret.character;
        //         }
        //     })
        
    }

    startPlaying() {
        this.env.editorContext.state.playing = true;
    }
    toggle() {
        console.log('>', this.state.value)
        this.state.value = '' +(parseInt(this.state.value) +1 );
        console.log('.', this.state.value)
    }
}
App.components = {  }

// Application setup
const editorContext = new Context({
    editor: null, // active Editor name
    data: {}, // active Editor data
    animationIndex: -1,
    activeMenu: -1,
    langIndex: 0,
    background: '#000',
    foreground: '#fff',
    charInfo: {}, // acs.CHARINFO, currently to get exact width & height
    animations: [], // acs anims
    playing: false,
});
App.env.editorContext = editorContext;

function setup() {
    const app = new App();
    app.mount(document.body);
}

whenReady(setup);