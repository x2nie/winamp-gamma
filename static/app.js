// -------------------------------------------------------------------------
// App
// For gamma, the function is defined by the following exponential function:
// C' = amplitude * pow(C, exponent) + offset
// -------------------------------------------------------------------------
class Filter extends Component {
    static template = xml/*html*/`
        <filter t-att-id="props.id" > 
            <t t-if="props.gammaSet">
                    <feColorMatrix type="matrix" result="grayscale" t-if="props.gammaSet.gray==0.05"
                        
                        t-attf-values=" {{(props.gammaSet.value[0]/32+128)/255-0.5+1}} 0 0 0 0
                                      0 {{(props.gammaSet.value[1]/32+128)/255-0.5+1}}   0 0 0
                                    0 0 {{(props.gammaSet.value[2]/32+128)/255-0.5+1}}     0 0
                                    0 0 0 1 0" >
                    </feColorMatrix>

                    
                    <t t-if="props.gammaSet.gray==0.09">
                        <!-- too dark -->
                        <!-- Map the grayscale result to the gradient map provided in tableValues -->
                        <feComponentTransfer color-interpolation-filters="sRGB">
                            <feFuncR type="table" t-attf-tableValues="{{-0.025+((props.gammaSet.value[0])/4096)}}  {{1.025+((props.gammaSet.value[0])/4096)}}"></feFuncR>
                            <feFuncG type="table" t-attf-tableValues="{{-0.025+((props.gammaSet.value[1])/4096)}}  {{1.025+((props.gammaSet.value[1])/4096)}}"></feFuncG>
                            <feFuncB type="table" t-attf-tableValues="{{-0.025+((props.gammaSet.value[2])/4096)}}  {{1.025+((props.gammaSet.value[2])/4096)}}"></feFuncB>
                        </feComponentTransfer>
                    </t>

                    <t t-if="props.gammaSet.gray==0.05">
                    <feComponentTransfer>
                        <feFuncR type="linear" t-attf-slope="{{1+((props.gammaSet.value[0]+0)/4096)}}" intercept="0"></feFuncR>
                        <feFuncG type="linear" t-attf-slope="{{1+((props.gammaSet.value[1]+0)/4096)}}" intercept="0"></feFuncG>
                        <feFuncB type="linear" t-attf-slope="{{1+((props.gammaSet.value[2]+0)/4096)}}" intercept="0"></feFuncB>
                    </feComponentTransfer>
                    </t>
                    
                    <t t-if="props.gammaSet.gray==0.0977">
                        <feColorMatrix type="matrix" result="grayscale"
                        t-attf-values="
                                {{(1+(props.gammaSet.value[0]+0)/4096)}} 0 0 0 0
                            0   {{(1+(props.gammaSet.value[1]+0)/4096)}}   0 0 0
                            0 0 {{(1+(props.gammaSet.value[2]+0)/4096)}}     0 0
                            0 0 0 1 0" >
                        </feColorMatrix>
                    </t>
                    
                    <t t-if="props.gammaSet.gray==0.0">
                    <feComponentTransfer color-interpolation-filters="sRGB" >
                        <feFuncR type="gamma" offset="0" exponent="1.0" t-attf-amplitude="{{(props.gammaSet.value[0]/4096)+1}}" />
                        <feFuncG type="gamma" offset="0" exponent="1.0" t-attf-amplitude="{{(props.gammaSet.value[1]/4096)+1}}" />
                        <feFuncB type="gamma" offset="0" exponent="1.0" t-attf-amplitude="{{(props.gammaSet.value[2]/4096)+1}}" />
                    </feComponentTransfer>
                    </t>
                    
                    <t t-if="props.gammaSet.gray==0.0001">
                    <feComponentTransfer color-interpolation-filters="sRGB" t-if="props.gammaSet.gray==0.0">
                        <feFuncR type="gamma" offset="0" exponent="1.0" t-attf-amplitude="{{(props.gammaSet.value[0] >> 12)+1}}" />
                        <feFuncG type="gamma" offset="0" exponent="1.0" t-attf-amplitude="{{(props.gammaSet.value[1] >> 12)+1}}" />
                        <feFuncB type="gamma" offset="0" exponent="1.0" t-attf-amplitude="{{(props.gammaSet.value[2] >> 12)+1}}" />
                    </feComponentTransfer>
                    </t>
                    
                    <t t-if="props.gammaSet.gray==0.99">
                        <feColorMatrix type="matrix" result="grayscale" t-if="0"
                            t-attf-values="
                            .33 .33 .33 0 0
                        .33 .33 .33 0 0
                        .33 .33 .33 0 0
                        0 0 0 1 0">
                        </feColorMatrix>
                    <feComponentTransfer color-interpolation-filters="sRGB" result="grayscale"  t-if="1">
                        <feFuncR type="table" t-attf-tableValues="{{(props.gammaSet.value[0]/32+128)/255-0.5}}  {{(props.gammaSet.value[0]/32+128)/255+0.5}}"></feFuncR>
                        <feFuncG type="table" t-attf-tableValues="{{(props.gammaSet.value[1]/32+128)/255-0.5}}  {{(props.gammaSet.value[1]/32+128)/255+0.5}}"></feFuncG>
                        <feFuncB type="table" t-attf-tableValues="{{(props.gammaSet.value[2]/32+128)/255-0.5}}  {{(props.gammaSet.value[2]/32+128)/255+0.5}}"></feFuncB>
                    </feComponentTransfer>
                    <feComponentTransfer color-interpolation-filters="sRGB" t-if="props.gammaSet.gray==0.666">
                        <feFuncR type="table" t-attf-tableValues="0.25 {{(props.gammaSet.value[0]/32+128)/255-0.25}}  {{(props.gammaSet.value[0]/32+128)/255+0.25}} 0.9"></feFuncR>
                        <feFuncG type="table" t-attf-tableValues="0.25 {{(props.gammaSet.value[1]/32+128)/255-0.25}}  {{(props.gammaSet.value[1]/32+128)/255+0.25}} 0.9"></feFuncG>
                        <feFuncB type="table" t-attf-tableValues="0.25 {{(props.gammaSet.value[2]/32+128)/255-0.25}}  {{(props.gammaSet.value[2]/32+128)/255+0.25}} 0.9"></feFuncB>
                    </feComponentTransfer>

                    <feComponentTransfer t-if="props.gammaSet.gray==0.055">
                        <feFuncR type="gamma" amplitude="1.0" exponent="1.0" t-attf-offset="{{(props.gammaSet.value[0]/32+128)/255-0.5}}" />
                        <feFuncG type="gamma" amplitude="1.0" exponent="1.0" t-attf-offset="{{(props.gammaSet.value[1]/32+128)/255-0.5}}" />
                        <feFuncB type="gamma" amplitude="1.0" exponent="1.0" t-attf-offset="{{(props.gammaSet.value[2]/32+128)/255-0.5}}" />
                    </feComponentTransfer>

                </t>


                    <t t-if="props.gammaSet.gray==1">
                        <!-- Grab the SourceGraphic (implicit) and convert it to grayscale -->
                        <feColorMatrix type="matrix" t-if="1"
                        values="
                        .334 .334 .334 0 0
                        .334 .334 .334 0 0
                        .334 .334 .334 0 0
                        0 0 0 1 0">
                    </feColorMatrix>
                    <!-- <feColorMatrix type="saturate" values="1.5" /> -->

                    <!-- Map the grayscale result to the gradient map provided in tableValues -->
                    <feComponentTransfer color-interpolation-filters="sRGB" t-if="0">
                        <feFuncR type="table" t-attf-tableValues="{{(props.gammaSet.value[0]/32+128)/255-0.5}}  {{(props.gammaSet.value[0]/32+128)/255+1.0}}"></feFuncR>
                        <feFuncG type="table" t-attf-tableValues="{{(props.gammaSet.value[1]/32+128)/255-0.5}}  {{(props.gammaSet.value[1]/32+128)/255+1.0}}"></feFuncG>
                        <feFuncB type="table" t-attf-tableValues="{{(props.gammaSet.value[2]/32+128)/255-0.5}}  {{(props.gammaSet.value[2]/32+128)/255+1.0}}"></feFuncB>
                    </feComponentTransfer>

                    <feComponentTransfer color-interpolation-filters="sRGB" result="grayscale"  t-if="1">
                        <feFuncR type="gamma" offset0="0" exponent="0.75" t-attf-amplitude="{{(props.gammaSet.value[0]/4096)+1.0}}" t-attf-offset0="{{(props.gammaSet.value[0]/4096)+1.0}}"/>
                        <feFuncG type="gamma" offset0="0" exponent="0.75" t-attf-amplitude="{{(props.gammaSet.value[1]/4096)+1.0}}" t-attf-offset0="{{(props.gammaSet.value[1]/4096)+1.0}}"/>
                        <feFuncB type="gamma" offset0="0" exponent="0.75" t-attf-amplitude="{{(props.gammaSet.value[2]/4096)+1.0}}" t-attf-offset0="{{(props.gammaSet.value[2]/4096)+1.0}}"/>
                    </feComponentTransfer>

                    </t>

                    <t t-if="props.gammaSet.gray==2">
                    <!-- Grab the SourceGraphic (implicit) and convert it to grayscale -->
                    <feColorMatrix type="matrix" t-if="1"
                        values="
                        .33 .33 .33 0 0
                        .33 .33 .33 0 0
                        .33 .33 .33 0 0
                        0 0 0 1 0">
                    </feColorMatrix>

                    <!-- Map the grayscale result to the gradient map provided in tableValues -->
                    <feComponentTransfer color-interpolation-filters="sRGB" t-if="0">
                        <feFuncR type="table" t-attf-tableValues="{{(props.gammaSet.value[0]/32+128)/255-0.5}}  {{(props.gammaSet.value[0]/32+128)/255+1.0}}"></feFuncR>
                        <feFuncG type="table" t-attf-tableValues="{{(props.gammaSet.value[1]/32+128)/255-0.5}}  {{(props.gammaSet.value[1]/32+128)/255+1.0}}"></feFuncG>
                        <feFuncB type="table" t-attf-tableValues="{{(props.gammaSet.value[2]/32+128)/255-0.5}}  {{(props.gammaSet.value[2]/32+128)/255+1.0}}"></feFuncB>
                    </feComponentTransfer>

                    <feComponentTransfer color-interpolation-filters="sRGB" result0="grayscale" t-if="1">
                        <feFuncR type="gamma" offset="0.0" exponent="1" t-attf-amplitude="{{(props.gammaSet.value[0]/4096)+1}}" />
                        <feFuncG type="gamma" offset="0.0" exponent="1" t-attf-amplitude="{{(props.gammaSet.value[1]/4096)+1}}" />
                        <feFuncB type="gamma" offset="0.0" exponent="1" t-attf-amplitude="{{(props.gammaSet.value[2]/4096)+1}}" />
                    </feComponentTransfer>

                    </t>

                    <t t-if="props.gammaSet.gray==2.999">
                    <!-- Grab the SourceGraphic (implicit) and convert it to grayscale -->
                    <feColorMatrix type="matrix" values="
                        .22 .22 .22 0 -0.01
                        .22 .22 .22 0 -0.01
                        .22 .22 .22 0 -0.01
                        0 0 0 1 0">
                    </feColorMatrix>

                    <!-- Map the grayscale result to the gradient map provided in tableValues -->
                    <feComponentTransfer result="gray" color-interpolation-filters="sRGB">
                        <feFuncR type="table" t-attf-tableValues="{{((props.gammaSet.value[0]/32+128)/255-0.5)/2}}  {{(props.gammaSet.value[0]/32+128)/255/1+0.75}}"></feFuncR>
                        <feFuncG type="table" t-attf-tableValues="{{((props.gammaSet.value[1]/32+128)/255-0.5)/2}}  {{(props.gammaSet.value[1]/32+128)/255/1+0.75}}"></feFuncG>
                        <feFuncB type="table" t-attf-tableValues="{{((props.gammaSet.value[2]/32+128)/255-0.5)/2}}  {{(props.gammaSet.value[2]/32+128)/255/1+0.75}}"></feFuncB>
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
        <svg width="381" height="216" style="outline: 1px solid red; display:inline-block;">
            <defs>
                <Filter id="'Display'" gammaSet="gammaSet.Display"/>
                <Filter id="'Backgrounds'" gammaSet="gammaSet.Backgrounds"/>
                <Filter id="'Frontcover'" gammaSet="gammaSet.Frontcover"/>
                <Filter id="'Buttons'" gammaSet="gammaSet.Buttons"/>
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
            <svg x="11px" y="55px" width="19px" height="19px" viewBox="2 25 19 19">
                <image href="static/img/b_toggle.png" note="suffle"  filter="url(#Buttons)"/>
            </svg>
            <svg x="15px" y="80px" width="19px" height="19px" viewBox="6 50 19 19">
                <image href="static/img/b_toggle.png" note="repeat"  filter="url(#Buttons)"/>
            </svg>
        </svg>

        <svg width="381" height="216" style="outline: 1px solid green; display:inline-block; margin-left:25px">
            <image href="static/img/Bgoverlay.png" filter0="url(#Backgrounds)"/>
            <image href="static/img/Display.png" x="53" y="9" filter0="url(#Display)"/>
            <image href="static/img/thinger.png" x="45" y="109" gammagroup="Thinger"/>
            <image href="static/img/front.png"  x="34" y="0" filter0="url(#Frontcover)"/>
        </svg>

        <div>
          Language:
          <select name="from" class="form-control" multiple="multiple" size="20"
                t-model="state.gammaset_name" value="state.gammaset_name">
                <t t-foreach="Object.keys(state.gammasets)" t-as="gammaset">
                    <option t-att-value="gammaset" t-key="gammaset_index"><t t-raw="gammaset" /></option>
                </t>
            </select>
            <div style="display:inline-block;">
                <div>
                    <t t-if="Object.keys(state.gammasets).length" t-foreach="Object.keys(state.gammasets[state.gammaset_name] || {})" t-as="gammagroup">
                        <div t-key="gammagroup">
                            <mute>g</mute><span t-raw="state.gammasets[state.gammaset_name][gammagroup].gray" /> <span> </span> 
                            <t t-set="RGB" t-value="state.gammasets[state.gammaset_name][gammagroup].value || [0,0,0]" />
                            <span t-if="!(RGB[0]==0 and RGB[1]==0 and RGB[2]==0)" t-attf-style="width:50px; height:15px; display:inline-block; border:1px solid silver; background: rgb({{RGB[0]/32+128}}, {{RGB[1]/32+128}}, {{RGB[2]/32+128}});"> </span>
                            <span t-if="RGB[0]==0 and RGB[1]==0 and RGB[2]==0" t-attf-style="width:50px; height:15px; display:inline-block; border:1px solid red;"> </span>
                            <mute>b</mute><span t-raw="state.gammasets[state.gammaset_name][gammagroup].boost" /> <span> </span> 
                            <t t-raw="gammagroup" />
                            (<t t-raw="RGB[0]" />, <t t-raw="RGB[1]" />, <t t-raw="RGB[2]" />) 
                        </div>
                    </t>
                </div>
                <button t-on-click="reset">Reset</button>
                Selected: <t t-raw="state.gammaset_name" />
            </div>
        </div>
    </div>`;

    constructor() {
        super(...arguments);
        this.state = useState({ word: 'Hello', value: '1234',gammasets: {}, 
            // gammaset_name: "xbox | pink"
            // gammaset_name: "WinXP1"
            // gammaset_name: "xbox | blue"
            // gammaset_name: "xbox | orange"
            // gammaset_name: "xbox | original"
            // gammaset_name: "DEVIANTART"
            // gammaset_name: "silver3 | blue2"
            // gammaset_name: "silver3 | yellow"
            gammaset_name: "silver3 | slateblue"
            // gammaset_name: "clean | brown"
            // gammaset_name: "clean | blue"
            // gammaset_name: "silver2 | brown"
            // gammaset_name: "SHINY | beer"
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