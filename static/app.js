// -------------------------------------------------------------------------
// App
// For gamma, the function is defined by the following exponential function:
// C' = amplitude * pow(C, exponent) + offset
// -------------------------------------------------------------------------
class Filter extends Component {
    static template = xml/*html*/`
        <filter t-att-id="props.id" > 
            <t t-if="props.gammaSet">
                    <feColorMatrix type="matrix" result="grayscale" t-if="props.gammaSet.gray==20"
                        
                        t-attf-values=" {{(props.gammaSet.value[0]/32+128)/255-0.5+1}} 0 0 0 0
                                      0 {{(props.gammaSet.value[1]/32+128)/255-0.5+1}} 0 0 0
                                    0 0 {{(props.gammaSet.value[2]/32+128)/255-0.5+1}} 0 0
                                    0 0 0 1 0" >
                    </feColorMatrix>

                    
                    <t t-if="props.gammaSet.gray==0">
                        <feColorMatrix type="matrix" result="grayscale" t-if="0"
                            t-attf-values="
                            1 0 0 0 0
                            0 1 0 0 0
                            0 0 1 0 0
                            0 0 0 1 0" >
                        </feColorMatrix>
                    <feComponentTransfer color-interpolation-filters="sRGB" t-if="props.gammaSet.gray==0">
                        <feFuncR type="table" t-attf-tableValues="{{(props.gammaSet.value[0]/32+128)/255-0.5}}  {{(props.gammaSet.value[0]/32+128)/255+0.5}}"></feFuncR>
                        <feFuncG type="table" t-attf-tableValues="{{(props.gammaSet.value[1]/32+128)/255-0.5}}  {{(props.gammaSet.value[1]/32+128)/255+0.5}}"></feFuncG>
                        <feFuncB type="table" t-attf-tableValues="{{(props.gammaSet.value[2]/32+128)/255-0.5}}  {{(props.gammaSet.value[2]/32+128)/255+0.5}}"></feFuncB>
                    </feComponentTransfer>
                </t>


                    <t t-if="props.gammaSet.gray==1">
                    <!-- Grab the SourceGraphic (implicit) and convert it to grayscale -->
                    <feColorMatrix type="matrix" values=".33 .33 .33 0 0
                        .33 .33 .33 0 0
                        .33 .33 .33 0 0
                        0 0 0 1 0">
                    </feColorMatrix>

                    <!-- Map the grayscale result to the gradient map provided in tableValues -->
                    <feComponentTransfer color-interpolation-filters="sRGB">
                        <feFuncR type="table" t-attf-tableValues="{{(props.gammaSet.value[0]/32+128)/255-0.5}}  {{(props.gammaSet.value[0]/32+128)/255+1.0}}"></feFuncR>
                        <feFuncG type="table" t-attf-tableValues="{{(props.gammaSet.value[1]/32+128)/255-0.5}}  {{(props.gammaSet.value[1]/32+128)/255+1.0}}"></feFuncG>
                        <feFuncB type="table" t-attf-tableValues="{{(props.gammaSet.value[2]/32+128)/255-0.5}}  {{(props.gammaSet.value[2]/32+128)/255+1.0}}"></feFuncB>
                    </feComponentTransfer>
                    </t>

                    <feColorMatrix type="matrix" result="gray" t-if="props.gammaSet.gray==100"
                        t-attf-values="
                        1 0 0 0 {{(props.gammaSet.value[0]/32+128)/255-0.5}}
                        0 1 0 0 {{(props.gammaSet.value[1]/32+128)/255-0.5}}
                        0 0 1 0 {{(props.gammaSet.value[2]/32+128)/255-0.5}}
                        0 0 0 1 0" >
                    </feColorMatrix>
            </t>
        </filter>
        `;
}
class App extends Component {
    // <!-- <LcdDisplay class="wz" value="'4,4.956'" /> -->
    static template = xml/*html*/`
    <div class="app">
        <svg width="381" height="216" style="outline: 1px solid red">
            <defs>
                <Filter id="'Display'" gammaSet="gammaSet.Display"/>
                <Filter id="'Backgrounds'" gammaSet="gammaSet.Backgrounds"/>
                <Filter id="'Frontcover'" gammaSet="gammaSet.Frontcover"/>
                <!-- <filter id="gamma"> 
                    <feComponentTransfer>
                    <feFuncR type="gamma" amplitude="0.5" exponent="0.3" offset="0.0" />
                    <feFuncG type="gamma" amplitude="0.75" exponent="0.5" offset="0.0" />
                    <feFuncB type="gamma" amplitude="1.5" exponent="0.7" offset="0.0" />
                    </feComponentTransfer>
                </filter>
                <filter id="Backgrounds0"> 
                    <t t-if="gammaSet.Backgrounds">
                    <feComponentTransfer>
                    <feFuncR type="gamma" t-att-exponent="(gammaSet.Backgrounds.value[2]/32+128)/255*2" amplitude="1" offset="0.0" />
                    <feFuncG type="gamma" t-att-exponent="(gammaSet.Backgrounds.value[1]/32+128)/255*2" amplitude="1" offset="0.0" />
                    <feFuncB type="gamma" t-att-exponent="(gammaSet.Backgrounds.value[0]/32+128)/255*2" amplitude="1" offset="0.0" />
                    </feComponentTransfer>
                    </t>
                </filter>
                <filter id="Backgrounds09"> 
                    <t t-if="gammaSet.Backgrounds">
                    <feColorMatrix type="matrix" result="grayscale"
                        t-attf-values=" {{(gammaSet.Display.value[0]/32+128)/255}} 0 0 0 0
                                        0 {{(gammaSet.Display.value[1]/32+128)/255}} 0 0 0
                                        0 0 {{(gammaSet.Display.value[2]/32+128)/255}} 0 0
                                        0 0 0 1 0" >
                    </feColorMatrix>
                    </t>
                </filter>

                <filter id="DisplayOkeZero" > 
                    <t t-if="gammaSet.Display">
                    <feColorMatrix type="matrix" result="grayscale" t-if="0"
                        t-attf-values=" {{(gammaSet.Display.value[0]/32+128)/255}} 0 0 0 0
                                        0 {{(gammaSet.Display.value[1]/32+128)/255}} 0 0 0
                                        0 0 {{(gammaSet.Display.value[2]/32+128)/255}} 0 0
                                        0 0 0 1 0" >
                    </feColorMatrix>
                    <feColorMatrix type="matrix" result="grayscale" t-if="1"
                        t-attf-values="
                        1 0 0 0 {{(gammaSet.Display.value[0]/32+128)/255-0.5}}
                        0 1 0 0 {{(gammaSet.Display.value[1]/32+128)/255-0.5}}
                        0 0 1 0 {{(gammaSet.Display.value[2]/32+128)/255-0.5}}
                        0 0 0 1 0" >
                    </feColorMatrix>
                    </t>
                </filter>
                

                <filter id="Frontcover0"> 
                    <t t-if="gammaSet.Frontcover">
                    <feComponentTransfer>
                    <feFuncR type="gamma" t-att-amplitude="(gammaSet.Frontcover.value[0]/32+128)/255+1" exponent="1" offset="0.0" />
                    <feFuncG type="gamma" t-att-amplitude="(gammaSet.Frontcover.value[1]/32+128)/255+1" exponent="1" offset="0.0" />
                    <feFuncB type="gamma" t-att-amplitude="(gammaSet.Frontcover.value[2]/32+128)/255+1" exponent="1" offset="0.0" />
                    </feComponentTransfer>
                    </t>
                </filter>

                <filter id="Frontcover"> 
                    <t t-if="gammaSet.Frontcover">
                    <feColorMatrix type="matrix" result="grayscale"
                        t-attf-values=" {{(gammaSet.Frontcover.value[0]/32+128)/255}} 0 0 0 0
                                        0 {{(gammaSet.Frontcover.value[1]/32+128)/255}} 0 0 0
                                        0 0 {{(gammaSet.Frontcover.value[2]/32+128)/255}} 0 0
                                        0 0 0 1 0" >
                    </feColorMatrix>
                    </t>
                </filter> -->

                <filter id="Display0"> 
                    <t t-if="gammaSet.Display">
                    <feColorMatrix type="matrix" result="grayscale"
                        values="1 1 1 0 0
                                1 1 1 0 0
                                1 1 1 0 0
                                0 0 0 1 0" >
                    </feColorMatrix>
                    <feComponentTransfer color-interpolation-filters="sRGB" >
                    <feFuncR type="table" t-attf-tableValues="{{(gammaSet.Display.value[0]/32+128)/255}} 1"></feFuncR>
                    <feFuncG type="table" t-attf-tableValues="{{(gammaSet.Display.value[1]/32+128)/255}} 1"></feFuncG>
                    <feFuncB type="table" t-attf-tableValues="{{(gammaSet.Display.value[2]/32+128)/255}} 1"></feFuncB>
                    <feFuncA type="table" tableValues="0 1"></feFuncA>
                    </feComponentTransfer>
                    </t>
                </filter>
            </defs>

            <!-- <image xlink:href="http://www.vanseodesign.com/blog/wp-content/uploads/2013/09/strawberry-fields.jpg" width="660" height="495" filter="url(#gamma)" /> -->
            <image href="static/img/Bgoverlay.png" filter="url(#Backgrounds)"/>
            <image href="static/img/Display.png" x="53" y="9" filter="url(#Display)"/>
            <image href="static/img/thinger.png" x="45" y="109" gammagroup="Thinger"/>
            <image href="static/img/front.png"  x="34" y="0" filter="url(#Frontcover)"/>
        </svg>

        <div>
          Language:
          <select name="from" class="form-control" multiple="multiple" size="20"
                t-model="state.gammaset_name" value="state.gammaset_name">
                <t t-foreach="Object.keys(state.gammasets)" t-as="gammaset">
                  <option t-att-value="gammaset" t-key="gammaset_index"><t t-raw="gammaset" /></option>
                </t>
              </select>
              <button t-on-click="reset">Reset</button>
              Selected: <t t-raw="state.gammaset_name" />
        </div>
    </div>`;

    constructor() {
        super(...arguments);
        this.state = useState({ word: 'Hello', value: '1234',gammasets: {}, 
            // gammaset_name: "xbox | pink"
            gammaset_name: "silver3 | yellow"
         });
        this.editorContext = useContext(this.env.editorContext);
        // this.gamasets = {}
        // JSON.stringify()
        var self = this;
        // fetch(`/data/${this.last_stamp}`)
        // fetch(`/data`)
        fetch(`/static/color-presets.json`)
            .then(function (response) {
                // The API call was successful!
                return response.json();
            }).then(function (ret) {
                if(ret) {
                    self.state.gammasets = ret;
                }
            })
        
    }

    get gammaSet(){
        return this.state.gammasets[this.state.gammaset_name] || {}
    }

    startPlaying() {
        this.env.editorContext.state.playing = true;
    }
    reset() {
        this.state.gammaset_name = '' 
    }
}
App.components = { Filter }

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