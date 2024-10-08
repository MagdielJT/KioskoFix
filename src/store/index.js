import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLoading: false,
        action: true,
        step: 0,
        startTimeLoading: 0,
        startTimeLoadingClient: 0,
        startTimeLoadingResume: 0,
        startTimeLoadingStamp: 0,
        statusRequestTicket: true,
        statusRequestClient: true,
        statusRequestResume: true,
        statusRequestStamp: true,
        messageTicket: '',
        messageClient: '',
        messageResume: 'Resumen desplegado con éxito',
        messageStamp: '',
        ticketId: '',
        ticketDate: '',
        ticketCantidad: '',
        ticketRfc: '',
        serviceConfigUrl: '',
        kioskoConnectionUrl: '',
        downloadFilesUrl: '',
        allConfigs: [],
        // allConfigs: [
        //     {
        //         id: '2',
        //         subsidiary: 'GRUPO VINOTECA : VINOTECA MEXICO S.A. DE C.V.',
        //         subsidiary_id: '3',
        //         company: 'VINOTECA MEXICO S.A. DE C.V.',
        //         logo: 'https://5907646.app.netsuite.com/core/media/media.nl?id=5092&c=5907646&h=-q-Eq_YFfEOZ9Thm4sqNs3lc4lA8yHzSsbLmPMMG76JSdFiE',
        //         css: 'https://5907646.app.netsuite.com/core/media/media.nl?id=22830&c=5907646&h=KPdJWt7N0ccT5HBtDo0408BlqqooKmUvJy53XqrWEq2VNLiD&mv=laj57ctc&_xt=.css',
        //         img_example:
        //             'https://5907646.app.netsuite.com/core/media/media.nl?id=46338&c=5907646&h=D6HEgtkBg6eNFN75qrTkaiRi5jPro5eAFOUCasFX8hMmv0Us',
        //         documentpack: '4',
        //         aditionalInfo:
        //             '{\r\n  "subsidiary": "3",\r\n  "salesrep": "2771",\r\n  "category": "20",\r\n  "cseg_efx_cstsg_cana": "1",\r\n  "custentity_efx_cmp_estado_cuenta": "1",\r\n  "custentity_efx_cmp_eje_cobran": "2659",\r\n  "custentity_efx_cmp_nombre_comer": "-",\r\n  "terms": "4",\r\n  "custentity_efx_mx_cfdi_usage": "1",\r\n  "custentity_efx_mx_payment_method": "28",\r\n  "custentity_efx_mx_payment_term": "4",\r\n  "custentity_efx_mx_cfdi_usage_cm": "2",\r\n  "custentity_efx_mx_pay_term_cm": "3",\r\n  "custentity_efx_mx_pay_meth_cm": "3",\r\n  "custentity_efx_mx_cfdi_us_cp": "22",\r\n  "custentity_efx_mx_pay_meth_cp": "4",\r\n  "custentity_efx_sat_payment_term_customer": "2"\r\n}',
        //         showMsgDetail: true,
        //         ieps: true,
        //         messages: {
        //             error: 'Hubo un error en el sistema, comuníquese con el administrador.',
        //             warning:
        //                 'Ha ocurrido un error inesperado, intente en un par de minutos.',
        //             custom: '',
        //             successStamp:
        //                 'Su factura ha sido enviada a su correo electrónico. Saludos.',
        //             errorStamp:
        //                 'Hubo un error al momento de generar la factura, lamentamos el inconveniente.',
        //         },
        //         altMsg: {
        //             displayCustom: true,
        //             nDef: 'Nota: Puede consultar PDF y XML Timbrados previamente capturando esta información.',
        //             customNote:
        //                 'Debido a los nuevos requerimientos del SAT en la versión 4.0 de CFDI, es necesario que indique su nombre, régimen fiscal y código postal, tal cual se encuentra en su constancia de situación fiscal para generar correctamente su factura.',
        //         },
        //         fields: [
        //             {
        //                 name: 'Fecha',
        //                 fieldID: 'trandate',
        //                 type: 'date',
        //                 rule: 'Fecha en la cual se realizó la compra',
        //                 icon_pack: 'fas',
        //                 icon: 'calendar',
        //             },
        //             {
        //                 name: 'RFC',
        //                 fieldID: 'custentity_mx_rfc',
        //                 type: 'text',
        //                 rule: 'RFC al que queremos timbrar',
        //                 icon_pack: 'fas',
        //                 icon: 'id-card',
        //             },
        //             {
        //                 name: 'Ticket',
        //                 fieldID: 'custbody_efx_iy_noticket',
        //                 type: 'text',
        //                 rule: 'No Ticket de la venta. Aparece en la parte superior del Ticket',
        //                 icon_pack: 'fas',
        //                 icon: 'ticket-alt',
        //             },
        //             {
        //                 name: 'Total',
        //                 fieldID: 'custbody_efx_iy_total_amount',
        //                 type: 'number',
        //                 rule: 'Total de la compra, puede encontrarlo en la parte inferior del ticket',
        //                 icon_pack: 'fas',
        //                 icon: 'money-bill-wave',
        //             },
        //         ],
        //         politics: [
        //             {
        //                 type: '1',
        //                 value: '45',
        //                 label: 'Se puede generar la factura (PDF y XML) dentro del mes de la compra.',
        //             },
        //         ],
        //         customerForm: {
        //             metodo_pago: {
        //                 label: 'Método de Pago',
        //                 id: 'metodo_pago',
        //                 disabled: false,
        //                 required: true,
        //                 default: '',
        //             },
        //             forma_pago: {
        //                 label: 'Forma de Pago',
        //                 id: 'forma_pago',
        //                 disabled: false,
        //                 required: true,
        //                 default: '',
        //             },
        //             uso_cfdi: {
        //                 label: 'Uso de CFDI',
        //                 id: 'uso_cfdi',
        //                 disabled: false,
        //                 required: true,
        //                 default: '',
        //             },
        //         },
        //     },
        // ],
        configSite: {},
        ticketSearch: {
            custparam_getinfo: 'T',
            custparam_accion: 'T',
            custparam_config: '',
        },
        paramsStamp: {
            custparam_genera: 'T',
        },
        countries: {},
        /* countries: {
            AU: {
                name: 'Australia',
                value: 'AU',
                states: [
                    {
                        id: '400',
                        name: 'Australian Capital Territory',
                        value: 'ACT',
                    },
                    {
                        id: '401',
                        name: 'New South Wales',
                        value: 'NSW',
                    },
                    {
                        id: '402',
                        name: 'Northern Territory',
                        value: 'NT',
                    },
                    {
                        id: '407',
                        name: 'Western Australia',
                        value: 'WA',
                    },
                    {
                        id: '404',
                        name: 'South Australia',
                        value: 'SA',
                    },
                    {
                        id: '405',
                        name: 'Tasmania',
                        value: 'TAS',
                    },
                    {
                        id: '406',
                        name: 'Victoria',
                        value: 'VIC',
                    },
                    {
                        id: '403',
                        name: 'Queensland',
                        value: 'QLD',
                    },
                ],
            },
            CA: {
                name: 'Canada',
                value: 'CA',
                states: [
                    {
                        id: '104',
                        name: 'New Brunswick',
                        value: 'NB',
                    },
                    {
                        id: '103',
                        name: 'Manitoba',
                        value: 'MB',
                    },
                    {
                        id: '102',
                        name: 'British Columbia',
                        value: 'BC',
                    },
                    {
                        id: '101',
                        name: 'Alberta',
                        value: 'AB',
                    },
                    {
                        id: '113',
                        name: 'Yukon',
                        value: 'YT',
                    },
                    {
                        id: '112',
                        name: 'Saskatchewan',
                        value: 'SK',
                    },
                    {
                        id: '105',
                        name: 'Newfoundland',
                        value: 'NL',
                    },
                    {
                        id: '110',
                        name: 'Prince Edward Island',
                        value: 'PE',
                    },
                    {
                        id: '109',
                        name: 'Ontario',
                        value: 'ON',
                    },
                    {
                        id: '108',
                        name: 'Nunavut',
                        value: 'NU',
                    },
                    {
                        id: '107',
                        name: 'Northwest Territories',
                        value: 'NT',
                    },
                    {
                        id: '106',
                        name: 'Nova Scotia',
                        value: 'NS',
                    },
                    {
                        id: '111',
                        name: 'Quebec',
                        value: 'QC',
                    },
                ],
            },
            CN: {
                name: 'China',
                value: 'CN',
                states: [
                    {
                        id: '614',
                        name: 'Jiangsu Province',
                        value: '江苏省',
                    },
                    {
                        id: '615',
                        name: 'Zhejiang Province',
                        value: '浙江省',
                    },
                    {
                        id: '616',
                        name: 'Anhui Province',
                        value: '安徽省',
                    },
                    {
                        id: '617',
                        name: 'Hubei Province',
                        value: '湖北省',
                    },
                    {
                        id: '618',
                        name: 'Hunan Province',
                        value: '湖南省',
                    },
                    {
                        id: '619',
                        name: 'Sichuan Province',
                        value: '四川省',
                    },
                    {
                        id: '620',
                        name: 'Guizhou Province',
                        value: '贵州省',
                    },
                    {
                        id: '621',
                        name: 'Jiangxi Province',
                        value: '江西省',
                    },
                    {
                        id: '622',
                        name: 'Guangdong Province',
                        value: '广东省',
                    },
                    {
                        id: '623',
                        name: 'Guangxi A. R.',
                        value: '广西壮族自治区',
                    },
                    {
                        id: '624',
                        name: 'Yunnan Province',
                        value: '云南省',
                    },
                    {
                        id: '625',
                        name: 'Hainan Province',
                        value: '海南省',
                    },
                    {
                        id: '626',
                        name: 'Xizang A. R.',
                        value: '西藏藏族自治区',
                    },
                    {
                        id: '627',
                        name: 'Beijing',
                        value: '北京市',
                    },
                    {
                        id: '628',
                        name: 'Shanghai',
                        value: '上海市',
                    },
                    {
                        id: '629',
                        name: 'Tianjin',
                        value: '天津市',
                    },
                    {
                        id: '630',
                        name: 'Chongqing',
                        value: '重庆市',
                    },
                    {
                        id: '613',
                        name: 'Shaanxi Province',
                        value: '陕西省',
                    },
                    {
                        id: '612',
                        name: 'Shanxi Province',
                        value: '山西省',
                    },
                    {
                        id: '611',
                        name: 'Shandong Province',
                        value: '山东省',
                    },
                    {
                        id: '610',
                        name: 'Henan Province',
                        value: '河南省',
                    },
                    {
                        id: '631',
                        name: 'Fujian Province',
                        value: '福建省',
                    },
                    {
                        id: '608',
                        name: 'Qinghai Province',
                        value: '青海省',
                    },
                    {
                        id: '607',
                        name: 'Xinjiang A. R.',
                        value: '新疆维吾尔族自治区',
                    },
                    {
                        id: '606',
                        name: 'Ningxia A. R.',
                        value: '宁夏回族自治区',
                    },
                    {
                        id: '605',
                        name: 'Gansu Province',
                        value: '甘肃省',
                    },
                    {
                        id: '604',
                        name: 'Neimenggu A. R.',
                        value: '内蒙古',
                    },
                    {
                        id: '603',
                        name: 'Liaoning Province',
                        value: '辽宁省',
                    },
                    {
                        id: '602',
                        name: 'Jilin Province',
                        value: '吉林省',
                    },
                    {
                        id: '601',
                        name: 'Heilongjiang Province',
                        value: '黑龙江省',
                    },
                    {
                        id: '609',
                        name: 'Hebei Province',
                        value: '河北省',
                    },
                ],
            },
            JP: {
                name: 'Japan',
                value: 'JP',
                states: [
                    {
                        id: '700',
                        name: 'Hokkaidō',
                        value: '北海道',
                    },
                    {
                        id: '746',
                        name: 'Okinawa',
                        value: '沖縄県',
                    },
                    {
                        id: '702',
                        name: 'Iwate',
                        value: '岩手県',
                    },
                    {
                        id: '703',
                        name: 'Miyagi',
                        value: '宮城県',
                    },
                    {
                        id: '704',
                        name: 'Akita',
                        value: '秋田県',
                    },
                    {
                        id: '705',
                        name: 'Yamagata',
                        value: '山形県',
                    },
                    {
                        id: '706',
                        name: 'Fukushima',
                        value: '福島県',
                    },
                    {
                        id: '707',
                        name: 'Ibaraki',
                        value: '茨城県',
                    },
                    {
                        id: '708',
                        name: 'Tochigi',
                        value: '栃木県',
                    },
                    {
                        id: '709',
                        name: 'Gunma',
                        value: '群馬県',
                    },
                    {
                        id: '710',
                        name: 'Saitama',
                        value: '埼玉県',
                    },
                    {
                        id: '711',
                        name: 'Chiba',
                        value: '千葉県',
                    },
                    {
                        id: '712',
                        name: 'Tokyo',
                        value: '東京都',
                    },
                    {
                        id: '713',
                        name: 'Kanagawa',
                        value: '神奈川県',
                    },
                    {
                        id: '714',
                        name: 'Niigata',
                        value: '新潟県',
                    },
                    {
                        id: '715',
                        name: 'Toyama',
                        value: '富山県',
                    },
                    {
                        id: '716',
                        name: 'Ishikawa',
                        value: '石川県',
                    },
                    {
                        id: '717',
                        name: 'Fukui',
                        value: '福井県',
                    },
                    {
                        id: '718',
                        name: 'Yamanashi',
                        value: '山梨県',
                    },
                    {
                        id: '719',
                        name: 'Nagano',
                        value: '長野県',
                    },
                    {
                        id: '720',
                        name: 'Gifu',
                        value: '岐阜県',
                    },
                    {
                        id: '721',
                        name: 'Shizuoka',
                        value: '静岡県',
                    },
                    {
                        id: '722',
                        name: 'Aichi',
                        value: '愛知県',
                    },
                    {
                        id: '723',
                        name: 'Mie',
                        value: '三重県',
                    },
                    {
                        id: '724',
                        name: 'Shiga',
                        value: '滋賀県',
                    },
                    {
                        id: '725',
                        name: 'Kyoto',
                        value: '京都府',
                    },
                    {
                        id: '726',
                        name: 'Osaka',
                        value: '大阪府',
                    },
                    {
                        id: '727',
                        name: 'Hyōgo',
                        value: '兵庫県',
                    },
                    {
                        id: '728',
                        name: 'Nara',
                        value: '奈良県',
                    },
                    {
                        id: '729',
                        name: 'Wakayama',
                        value: '和歌山県',
                    },
                    {
                        id: '730',
                        name: 'Tottori',
                        value: '鳥取県',
                    },
                    {
                        id: '731',
                        name: 'Shimane',
                        value: '島根県',
                    },
                    {
                        id: '732',
                        name: 'Okayama',
                        value: '岡山県',
                    },
                    {
                        id: '733',
                        name: 'Hiroshima',
                        value: '広島県',
                    },
                    {
                        id: '734',
                        name: 'Yamaguchi',
                        value: '山口県',
                    },
                    {
                        id: '735',
                        name: 'Tokushima',
                        value: '徳島県',
                    },
                    {
                        id: '736',
                        name: 'Kagawa',
                        value: '香川県',
                    },
                    {
                        id: '737',
                        name: 'Ehime',
                        value: '愛媛県',
                    },
                    {
                        id: '738',
                        name: 'Kochi',
                        value: '高知県',
                    },
                    {
                        id: '739',
                        name: 'Fukuoka',
                        value: '福岡県',
                    },
                    {
                        id: '740',
                        name: 'Saga',
                        value: '佐賀県',
                    },
                    {
                        id: '741',
                        name: 'Nagasaki',
                        value: '長崎県',
                    },
                    {
                        id: '742',
                        name: 'Kumamoto',
                        value: '熊本県',
                    },
                    {
                        id: '743',
                        name: 'Ōita',
                        value: '大分県',
                    },
                    {
                        id: '744',
                        name: 'Miyazaki',
                        value: '宮崎県',
                    },
                    {
                        id: '745',
                        name: 'Kagoshima',
                        value: '鹿児島県',
                    },
                    {
                        id: '701',
                        name: 'Aomori',
                        value: '青森県',
                    },
                ],
            },
            MX: {
                name: 'Mexico',
                value: 'MX',
                states: [
                    {
                        id: '500',
                        name: 'Aguascalientes',
                        value: 'AGS',
                    },
                    {
                        id: '501',
                        name: 'Baja California Norte (obsolete)',
                        value: 'BCN',
                    },
                    {
                        id: '502',
                        name: 'Baja California Sur',
                        value: 'BCS',
                    },
                    {
                        id: '503',
                        name: 'Campeche',
                        value: 'CAM',
                    },
                    {
                        id: '504',
                        name: 'Chiapas',
                        value: 'CHIS',
                    },
                    {
                        id: '505',
                        name: 'Chihuahua',
                        value: 'CHIH',
                    },
                    {
                        id: '506',
                        name: 'Coahuila',
                        value: 'COAH',
                    },
                    {
                        id: '507',
                        name: 'Colima',
                        value: 'COL',
                    },
                    {
                        id: '508',
                        name: 'Distrito Federal (obsolete)',
                        value: 'DF',
                    },
                    {
                        id: '509',
                        name: 'Durango',
                        value: 'DGO',
                    },
                    {
                        id: '510',
                        name: 'Guanajuato',
                        value: 'GTO',
                    },
                    {
                        id: '511',
                        name: 'Guerrero',
                        value: 'GRO',
                    },
                    {
                        id: '512',
                        name: 'Hidalgo',
                        value: 'HGO',
                    },
                    {
                        id: '513',
                        name: 'Jalisco',
                        value: 'JAL',
                    },
                    {
                        id: '514',
                        name: 'México (Estado de)',
                        value: 'MEX',
                    },
                    {
                        id: '515',
                        name: 'Michoacán',
                        value: 'MICH',
                    },
                    {
                        id: '516',
                        name: 'Morelos',
                        value: 'MOR',
                    },
                    {
                        id: '517',
                        name: 'Nayarit',
                        value: 'NAY',
                    },
                    {
                        id: '518',
                        name: 'Nuevo León',
                        value: 'NL',
                    },
                    {
                        id: '519',
                        name: 'Oaxaca',
                        value: 'OAX',
                    },
                    {
                        id: '520',
                        name: 'Puebla',
                        value: 'PUE',
                    },
                    {
                        id: '521',
                        name: 'Querétaro',
                        value: 'QRO',
                    },
                    {
                        id: '522',
                        name: 'Quintana Roo',
                        value: 'QROO',
                    },
                    {
                        id: '532',
                        name: 'Baja California',
                        value: 'BC',
                    },
                    {
                        id: '533',
                        name: 'Mexico City',
                        value: 'CDMX',
                    },
                    {
                        id: '523',
                        name: 'San Luis Potosí',
                        value: 'SLP',
                    },
                    {
                        id: '524',
                        name: 'Sinaloa',
                        value: 'SIN',
                    },
                    {
                        id: '525',
                        name: 'Sonora',
                        value: 'SON',
                    },
                    {
                        id: '526',
                        name: 'Tabasco',
                        value: 'TAB',
                    },
                    {
                        id: '527',
                        name: 'Tamaulipas',
                        value: 'TAMPS',
                    },
                    {
                        id: '528',
                        name: 'Tlaxcala',
                        value: 'TLAX',
                    },
                    {
                        id: '529',
                        name: 'Veracruz',
                        value: 'VER',
                    },
                    {
                        id: '530',
                        name: 'Yucatán',
                        value: 'YUC',
                    },
                    {
                        id: '531',
                        name: 'Zacatecas',
                        value: 'ZAC',
                    },
                ],
            },
            GB: {
                name: 'United Kingdom',
                value: 'GB',
                states: [
                    {
                        id: '267',
                        name: 'Isle of Tiree',
                        value: 'Isle of Tiree',
                    },
                    {
                        id: '268',
                        name: 'Isle of Wight',
                        value: 'Isle of Wight',
                    },
                    {
                        id: '269',
                        name: 'Kent',
                        value: 'Kent',
                    },
                    {
                        id: '270',
                        name: 'Kincardineshire',
                        value: 'Kincardineshire',
                    },
                    {
                        id: '271',
                        name: 'Kinross-shire',
                        value: 'Kinross-shire',
                    },
                    {
                        id: '272',
                        name: 'Kirkcudbrightshire',
                        value: 'Kirkcudbrightshire',
                    },
                    {
                        id: '273',
                        name: 'Lanarkshire',
                        value: 'Lanarkshire',
                    },
                    {
                        id: '274',
                        name: 'Lancashire',
                        value: 'Lancs.',
                    },
                    {
                        id: '275',
                        name: 'Leicestershire',
                        value: 'Leics.',
                    },
                    {
                        id: '276',
                        name: 'Lincolnshire',
                        value: 'Lincs.',
                    },
                    {
                        id: '277',
                        name: 'Merseyside',
                        value: 'Merseyside',
                    },
                    {
                        id: '278',
                        name: 'Mid Glamorgan',
                        value: 'M Glam',
                    },
                    {
                        id: '279',
                        name: 'Mid Lothian',
                        value: 'Mid Lothian',
                    },
                    {
                        id: '280',
                        name: 'Middlesex',
                        value: 'Middx.',
                    },
                    {
                        id: '281',
                        name: 'Morayshire',
                        value: 'Morayshire',
                    },
                    {
                        id: '282',
                        name: 'Nairnshire',
                        value: 'Nairnshire',
                    },
                    {
                        id: '283',
                        name: 'Norfolk',
                        value: 'Norfolk',
                    },
                    {
                        id: '284',
                        name: 'North Humberside',
                        value: 'N Humberside',
                    },
                    {
                        id: '285',
                        name: 'North Yorkshire',
                        value: 'N Yorkshire',
                    },
                    {
                        id: '286',
                        name: 'Northamptonshire',
                        value: 'Northants.',
                    },
                    {
                        id: '287',
                        name: 'Northumberland',
                        value: 'Northumberland',
                    },
                    {
                        id: '288',
                        name: 'Nottinghamshire',
                        value: 'Notts.',
                    },
                    {
                        id: '289',
                        name: 'Oxfordshire',
                        value: 'Oxon.',
                    },
                    {
                        id: '290',
                        name: 'Peeblesshire',
                        value: 'Peeblesshire',
                    },
                    {
                        id: '291',
                        name: 'Perthshire',
                        value: 'Perthshire',
                    },
                    {
                        id: '292',
                        name: 'Powys',
                        value: 'Powys',
                    },
                    {
                        id: '293',
                        name: 'Renfrewshire',
                        value: 'Renfrewshire',
                    },
                    {
                        id: '294',
                        name: 'Ross-shire',
                        value: 'Ross-shire',
                    },
                    {
                        id: '295',
                        name: 'Roxburghshire',
                        value: 'Roxburghshire',
                    },
                    {
                        id: '297',
                        name: 'Shropshire',
                        value: 'Shrops',
                    },
                    {
                        id: '298',
                        name: 'Selkirkshire',
                        value: 'Selkirkshire',
                    },
                    {
                        id: '299',
                        name: 'Somerset',
                        value: 'Somt.',
                    },
                    {
                        id: '300',
                        name: 'South Glamorgan',
                        value: 'S Glam',
                    },
                    {
                        id: '301',
                        name: 'South Humberside',
                        value: 'S Humberside',
                    },
                    {
                        id: '302',
                        name: 'South Yorkshire',
                        value: 'S Yorkshire',
                    },
                    {
                        id: '303',
                        name: 'Staffordshire',
                        value: 'Staffs.',
                    },
                    {
                        id: '304',
                        name: 'Stirlingshire',
                        value: 'Stirlingshire',
                    },
                    {
                        id: '305',
                        name: 'Suffolk',
                        value: 'Suffolk',
                    },
                    {
                        id: '306',
                        name: 'Surrey',
                        value: 'Surrey',
                    },
                    {
                        id: '307',
                        name: 'Sutherland',
                        value: 'Sutherland',
                    },
                    {
                        id: '308',
                        name: 'Tyne and Wear',
                        value: 'Tyne & Wear',
                    },
                    {
                        id: '309',
                        name: 'Warwickshire',
                        value: 'Warks',
                    },
                    {
                        id: '310',
                        name: 'West Glamorgan',
                        value: 'W Glam',
                    },
                    {
                        id: '311',
                        name: 'West Lothian',
                        value: 'W Lothian',
                    },
                    {
                        id: '312',
                        name: 'West Midlands',
                        value: 'W Midlands',
                    },
                    {
                        id: '313',
                        name: 'West Sussex',
                        value: 'W Sussex',
                    },
                    {
                        id: '314',
                        name: 'West Yorkshire',
                        value: 'W Yorkshire',
                    },
                    {
                        id: '315',
                        name: 'Wigtownshire',
                        value: 'Wigtownshire',
                    },
                    {
                        id: '316',
                        name: 'Wiltshire',
                        value: 'Wilts',
                    },
                    {
                        id: '317',
                        name: 'Worcestershire',
                        value: 'Worcs',
                    },
                    {
                        id: '201',
                        name: 'Aberdeenshire',
                        value: 'Aberdeenshire',
                    },
                    {
                        id: '202',
                        name: 'Angus',
                        value: 'Angus',
                    },
                    {
                        id: '203',
                        name: 'Argyll',
                        value: 'Argyll',
                    },
                    {
                        id: '204',
                        name: 'Avon',
                        value: 'Avon',
                    },
                    {
                        id: '205',
                        name: 'Ayrshire',
                        value: 'Ayrshire',
                    },
                    {
                        id: '206',
                        name: 'Banffshire',
                        value: 'Banffshire',
                    },
                    {
                        id: '207',
                        name: 'Bedfordshire',
                        value: 'Beds.',
                    },
                    {
                        id: '208',
                        name: 'Berkshire',
                        value: 'Berks.',
                    },
                    {
                        id: '209',
                        name: 'Berwickshire',
                        value: 'Berwickshire',
                    },
                    {
                        id: '210',
                        name: 'Buckinghamshire',
                        value: 'Bucks.',
                    },
                    {
                        id: '211',
                        name: 'Caithness',
                        value: 'Caithness',
                    },
                    {
                        id: '212',
                        name: 'Cambridgeshire',
                        value: 'Cambs.',
                    },
                    {
                        id: '213',
                        name: 'Cheshire',
                        value: 'Ches.',
                    },
                    {
                        id: '214',
                        name: 'Clackmannanshire',
                        value: 'Clackmannanshire',
                    },
                    {
                        id: '215',
                        name: 'Cleveland',
                        value: 'Cleveland',
                    },
                    {
                        id: '216',
                        name: 'Clwyd',
                        value: 'Clwyd',
                    },
                    {
                        id: '217',
                        name: 'Cornwall',
                        value: 'Cornwall',
                    },
                    {
                        id: '218',
                        name: 'County Antrim',
                        value: 'Co Antrim',
                    },
                    {
                        id: '219',
                        name: 'County Armagh',
                        value: 'Co Armagh',
                    },
                    {
                        id: '220',
                        name: 'County Down',
                        value: 'Co Down',
                    },
                    {
                        id: '221',
                        name: 'County Fermanagh',
                        value: 'Co Fermanagh',
                    },
                    {
                        id: '222',
                        name: 'County Londonderry',
                        value: 'Co Londonderry',
                    },
                    {
                        id: '223',
                        name: 'County Tyrone',
                        value: 'Co Tyrone',
                    },
                    {
                        id: '225',
                        name: 'Cumbria',
                        value: 'Cumbria',
                    },
                    {
                        id: '226',
                        name: 'Derbyshire',
                        value: 'Derbys.',
                    },
                    {
                        id: '227',
                        name: 'Devon',
                        value: 'Devon',
                    },
                    {
                        id: '228',
                        name: 'Dorset',
                        value: 'Dorset',
                    },
                    {
                        id: '229',
                        name: 'Dumfriesshire',
                        value: 'Dumfriesshire',
                    },
                    {
                        id: '230',
                        name: 'Dunbartonshire',
                        value: 'Dunbartonshire',
                    },
                    {
                        id: '231',
                        name: 'County Durham',
                        value: 'Durham',
                    },
                    {
                        id: '232',
                        name: 'Dyfed',
                        value: 'Dyfed',
                    },
                    {
                        id: '233',
                        name: 'East Sussex',
                        value: 'E Sussex',
                    },
                    {
                        id: '234',
                        name: 'East Lothian',
                        value: 'E Lothian',
                    },
                    {
                        id: '235',
                        name: 'Essex',
                        value: 'Essex',
                    },
                    {
                        id: '236',
                        name: 'Fife',
                        value: 'Fife',
                    },
                    {
                        id: '237',
                        name: 'Gloucestershire',
                        value: 'Gloucs.',
                    },
                    {
                        id: '238',
                        name: 'Greater London',
                        value: 'London',
                    },
                    {
                        id: '239',
                        name: 'Gwent',
                        value: 'Gwent',
                    },
                    {
                        id: '240',
                        name: 'Gwynedd',
                        value: 'Gwynedd',
                    },
                    {
                        id: '241',
                        name: 'Hampshire',
                        value: 'Hants.',
                    },
                    {
                        id: '242',
                        name: 'Herefordshire',
                        value: 'Hereford',
                    },
                    {
                        id: '243',
                        name: 'Hertfordshire',
                        value: 'Herts.',
                    },
                    {
                        id: '245',
                        name: 'Inverness-shire',
                        value: 'Inverness-shire',
                    },
                    {
                        id: '246',
                        name: 'Isle of Arran',
                        value: 'Isle of Arran',
                    },
                    {
                        id: '247',
                        name: 'Isle of Barra',
                        value: 'Isle of Barra',
                    },
                    {
                        id: '248',
                        name: 'Isle of Benbecula',
                        value: 'Isle of Benbecula',
                    },
                    {
                        id: '249',
                        name: 'Isle of Bute',
                        value: 'Isle of Bute',
                    },
                    {
                        id: '250',
                        name: 'Isle of Canna',
                        value: 'Isle of Canna',
                    },
                    {
                        id: '251',
                        name: 'Isle of Coll',
                        value: 'Isle of Coll',
                    },
                    {
                        id: '252',
                        name: 'Isle of Colonsay',
                        value: 'Isle of Colonsay',
                    },
                    {
                        id: '253',
                        name: 'Isle of Cumbrae',
                        value: 'Isle of Cumbrae',
                    },
                    {
                        id: '254',
                        name: 'Isle of Eigg',
                        value: 'Isle of Eigg',
                    },
                    {
                        id: '255',
                        name: 'Isle of Gigha',
                        value: 'Isle of Gigha',
                    },
                    {
                        id: '256',
                        name: 'Isle of Harris',
                        value: 'Isle of Harris',
                    },
                    {
                        id: '257',
                        name: 'Isle of Islay',
                        value: 'Isle of Islay',
                    },
                    {
                        id: '258',
                        name: 'Isle of Iona',
                        value: 'Isle of Iona',
                    },
                    {
                        id: '259',
                        name: 'Isle of Jura',
                        value: 'Isle of Jura',
                    },
                    {
                        id: '260',
                        name: 'Isle of Lewis',
                        value: 'Isle of Lewis',
                    },
                    {
                        id: '261',
                        name: 'Isle of Mull',
                        value: 'Isle of Mull',
                    },
                    {
                        id: '262',
                        name: 'Isle of North Uist',
                        value: 'Isle of North Uist',
                    },
                    {
                        id: '263',
                        name: 'Isle of Rum',
                        value: 'Isle of Rum',
                    },
                    {
                        id: '264',
                        name: 'Isle of Scalpay',
                        value: 'Isle of Scalpay',
                    },
                    {
                        id: '265',
                        name: 'Isle of Skye',
                        value: 'Isle of Skye',
                    },
                    {
                        id: '266',
                        name: 'Isle of South Uist',
                        value: 'Isle of South Uist',
                    },
                ],
            },
            US: {
                name: 'United States',
                value: 'US',
                states: [
                    {
                        id: '14',
                        name: 'Indiana',
                        value: 'IN',
                    },
                    {
                        id: '13',
                        name: 'Illinois',
                        value: 'IL',
                    },
                    {
                        id: '16',
                        name: 'Kansas',
                        value: 'KS',
                    },
                    {
                        id: '17',
                        name: 'Kentucky',
                        value: 'KY',
                    },
                    {
                        id: '18',
                        name: 'Louisiana',
                        value: 'LA',
                    },
                    {
                        id: '19',
                        name: 'Maine',
                        value: 'ME',
                    },
                    {
                        id: '20',
                        name: 'Maryland',
                        value: 'MD',
                    },
                    {
                        id: '21',
                        name: 'Massachusetts',
                        value: 'MA',
                    },
                    {
                        id: '22',
                        name: 'Michigan',
                        value: 'MI',
                    },
                    {
                        id: '23',
                        name: 'Minnesota',
                        value: 'MN',
                    },
                    {
                        id: '24',
                        name: 'Mississippi',
                        value: 'MS',
                    },
                    {
                        id: '25',
                        name: 'Missouri',
                        value: 'MO',
                    },
                    {
                        id: '26',
                        name: 'Montana',
                        value: 'MT',
                    },
                    {
                        id: '27',
                        name: 'Nebraska',
                        value: 'NE',
                    },
                    {
                        id: '28',
                        name: 'Nevada',
                        value: 'NV',
                    },
                    {
                        id: '29',
                        name: 'New Hampshire',
                        value: 'NH',
                    },
                    {
                        id: '30',
                        name: 'New Jersey',
                        value: 'NJ',
                    },
                    {
                        id: '31',
                        name: 'New Mexico',
                        value: 'NM',
                    },
                    {
                        id: '32',
                        name: 'New York',
                        value: 'NY',
                    },
                    {
                        id: '33',
                        name: 'North Carolina',
                        value: 'NC',
                    },
                    {
                        id: '34',
                        name: 'North Dakota',
                        value: 'ND',
                    },
                    {
                        id: '35',
                        name: 'Ohio',
                        value: 'OH',
                    },
                    {
                        id: '36',
                        name: 'Oklahoma',
                        value: 'OK',
                    },
                    {
                        id: '37',
                        name: 'Oregon',
                        value: 'OR',
                    },
                    {
                        id: '38',
                        name: 'Pennsylvania',
                        value: 'PA',
                    },
                    {
                        id: '39',
                        name: 'Puerto Rico',
                        value: 'PR',
                    },
                    {
                        id: '40',
                        name: 'Rhode Island',
                        value: 'RI',
                    },
                    {
                        id: '41',
                        name: 'South Carolina',
                        value: 'SC',
                    },
                    {
                        id: '42',
                        name: 'South Dakota',
                        value: 'SD',
                    },
                    {
                        id: '43',
                        name: 'Tennessee',
                        value: 'TN',
                    },
                    {
                        id: '44',
                        name: 'Texas',
                        value: 'TX',
                    },
                    {
                        id: '45',
                        name: 'Utah',
                        value: 'UT',
                    },
                    {
                        id: '46',
                        name: 'Vermont',
                        value: 'VT',
                    },
                    {
                        id: '47',
                        name: 'Virginia',
                        value: 'VA',
                    },
                    {
                        id: '48',
                        name: 'Washington',
                        value: 'WA',
                    },
                    {
                        id: '49',
                        name: 'West Virginia',
                        value: 'WV',
                    },
                    {
                        id: '50',
                        name: 'Wisconsin',
                        value: 'WI',
                    },
                    {
                        id: '51',
                        name: 'Wyoming',
                        value: 'WY',
                    },
                    {
                        id: '52',
                        name: 'Armed Forces Europe',
                        value: 'AE',
                    },
                    {
                        id: '53',
                        name: 'Armed Forces Americas',
                        value: 'AA',
                    },
                    {
                        id: '54',
                        name: 'Armed Forces Pacific',
                        value: 'AP',
                    },
                    {
                        id: '0',
                        name: 'Alabama',
                        value: 'AL',
                    },
                    {
                        id: '1',
                        name: 'Alaska',
                        value: 'AK',
                    },
                    {
                        id: '2',
                        name: 'Arizona',
                        value: 'AZ',
                    },
                    {
                        id: '3',
                        name: 'Arkansas',
                        value: 'AR',
                    },
                    {
                        id: '4',
                        name: 'California',
                        value: 'CA',
                    },
                    {
                        id: '5',
                        name: 'Colorado',
                        value: 'CO',
                    },
                    {
                        id: '6',
                        name: 'Connecticut',
                        value: 'CT',
                    },
                    {
                        id: '7',
                        name: 'Delaware',
                        value: 'DE',
                    },
                    {
                        id: '8',
                        name: 'District of Columbia',
                        value: 'DC',
                    },
                    {
                        id: '9',
                        name: 'Florida',
                        value: 'FL',
                    },
                    {
                        id: '10',
                        name: 'Georgia',
                        value: 'GA',
                    },
                    {
                        id: '11',
                        name: 'Hawaii',
                        value: 'HI',
                    },
                    {
                        id: '12',
                        name: 'Idaho',
                        value: 'ID',
                    },
                    {
                        id: '15',
                        name: 'Iowa',
                        value: 'IA',
                    },
                ],
            },
        }, */
        billingInformation: {},
        /* billingInformation: {
            uso_cfdi: [
                {
                    id: '1',
                    value: 'G01 - Adquisición de Mercancías',
                },
                {
                    id: '2',
                    value: 'G02 - Devoluciones, Descuentos o Bonificaciones',
                },
                {
                    id: '3',
                    value: 'G03 - Gastos en General',
                },
                {
                    id: '4',
                    value: 'I01 - Construcciones',
                },
                {
                    id: '5',
                    value: 'I02 - Mobiliario y Equipo de Oficina por Inversiones',
                },
                {
                    id: '6',
                    value: 'I03 - Equipo de Transporte',
                },
                {
                    id: '7',
                    value: 'I04 - Equipo de Cómputo y Accesorios',
                },
                {
                    id: '8',
                    value: 'I05 - Dados, Troqueles, Moldes, Matrices y Herramental',
                },
                {
                    id: '9',
                    value: 'I06 - Comunicaciones Telefónicas',
                },
                {
                    id: '10',
                    value: 'I07 - Comunicaciones Satelitales',
                },
                {
                    id: '11',
                    value: 'I08 - Otra Maquinaria y Equipo',
                },
                {
                    id: '12',
                    value: 'D01 - Honorarios Médicos, Dentales y Gastos Hospitalarios',
                },
                {
                    id: '13',
                    value: 'D02 - Gastos Médicos por Incapacidad o Discapacidad',
                },
                {
                    id: '14',
                    value: 'D03 - Gastos Funerales',
                },
                {
                    id: '15',
                    value: 'D04 - Donativos',
                },
                {
                    id: '16',
                    value: 'D05 - Intereses Reales Efectivamente Pagados por Créditos Hipotecarios (Casa Habitación)',
                },
                {
                    id: '17',
                    value: 'D06 - Aportaciones Voluntarias al SAR',
                },
                {
                    id: '18',
                    value: 'D07 - Primas por Seguros de Gastos Médicos',
                },
                {
                    id: '19',
                    value: 'D08 - Gastos de Transportación Escolar Obligatoria',
                },
                {
                    id: '20',
                    value: 'D09 - Depósitos en Cuentas para el Ahorro, Primas que Tengan como Base Planes de Pensiones',
                },
                {
                    id: '21',
                    value: 'D10 - Pagos por Servicios Educativos (Colegiaturas)',
                },
                {
                    id: '22',
                    value: 'P01 - Por Definir',
                },
            ],
            paymt_term: [
                {
                    id: '1',
                    value: '01 - Efectivo',
                },
                {
                    id: '2',
                    value: '02 - Cheque Nominativo',
                },
                {
                    id: '3',
                    value: '03 - Transferencia Electrónica de Fondos',
                },
                {
                    id: '4',
                    value: '04 - Tarjeta de Crédito',
                },
                {
                    id: '5',
                    value: '05 - Monedero Electrónico',
                },
                {
                    id: '6',
                    value: '06 - Dinero Electrónico',
                },
                {
                    id: '7',
                    value: '07 - Tarjetas Digitales',
                },
                {
                    id: '8',
                    value: '08 - Vales de Despensa',
                },
                {
                    id: '9',
                    value: '09 - Bienes',
                },
                {
                    id: '10',
                    value: '10 - Servicio',
                },
                {
                    id: '11',
                    value: '11 - Por cuenta de tercero',
                },
                {
                    id: '12',
                    value: '12 - Dación en Pago',
                },
                {
                    id: '13',
                    value: '13 - Pago por Subrogación',
                },
                {
                    id: '14',
                    value: '14 - Pago por Consignación',
                },
                {
                    id: '15',
                    value: '15 - Condonación',
                },
                {
                    id: '16',
                    value: '16 - Cancelación',
                },
                {
                    id: '17',
                    value: '17 - Compensación',
                },
                {
                    id: '18',
                    value: '23 - Novación',
                },
                {
                    id: '19',
                    value: '24 - Confusión',
                },
                {
                    id: '20',
                    value: '25 - Remisión de Deuda',
                },
                {
                    id: '21',
                    value: '26 - Prescripción o Caducidad',
                },
                {
                    id: '22',
                    value: '27 - A Satisfacción del Acreedor',
                },
                {
                    id: '23',
                    value: '28 - Tarjeta de Débito',
                },
                {
                    id: '24',
                    value: '29 - Tarjeta de Servicios',
                },
                {
                    id: '25',
                    value: '30 - Aplicación de Anticipos',
                },
                {
                    id: '26',
                    value: '31 - Intermediario Pagos',
                },
                {
                    id: '27',
                    value: '98 - N/A',
                },
                {
                    id: '28',
                    value: '99 - Por Definir',
                },
            ],
            paymt_method: [
                {
                    id: '3',
                    value: 'PUE - Pago en una Sola Exhibición',
                },
                {
                    id: '4',
                    value: 'PPD - Pago en Parcialidades o Diferido',
                },
            ],
            industry_type: [
                {
                    id: '1',
                    value: '601 - General of Legal Entities',
                },
                {
                    id: '2',
                    value: '603 - Nonprofit Organizations',
                },
                {
                    id: '11',
                    value: '605 - Wages, Salaries and Income Assimilated to Salaries',
                },
                {
                    id: '12',
                    value: '606 - Lease',
                },
                {
                    id: '10',
                    value: '607 - System of Disposal or Acquisition of Goods',
                },
                {
                    id: '13',
                    value: '608 - Other Incomes',
                },
                {
                    id: '4',
                    value: '610 - Residents Abroad without Permanent Residence in Mexico',
                },
                {
                    id: '14',
                    value: '611 - Income from Dividends (Partners and Shareholders)',
                },
                {
                    id: '15',
                    value: '612 - Individuals with Business and Professional Activities',
                },
                {
                    id: '16',
                    value: '614 - Income from Interests',
                },
                {
                    id: '19',
                    value: '615 - Revenue Regime for Obtaining Prizes',
                },
                {
                    id: '17',
                    value: '616 - Without Tax Obligations',
                },
                {
                    id: '5',
                    value: '620 - Production Cooperatives that Choose to Defer their Income',
                },
                {
                    id: '18',
                    value: '621 - Fiscal Incorporation',
                },
                {
                    id: '6',
                    value: '622 - Agricultural, Cattle, Silvicultural and Fishing Activities',
                },
                {
                    id: '7',
                    value: '623 - Optional for Groups of Companies',
                },
                {
                    id: '8',
                    value: '624 - Coordinated',
                },
                {
                    id: '22',
                    value: '625 - Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas',
                },
                {
                    id: '23',
                    value: '626 - Régimen Simplificado de Confianza',
                },
            ],
        }, */
        clientData: {},
        /* clientData: {
            cliente: {
                existe: true,
                rfc: 'RALM920512HG8',
                tipo: true,
                nombre: 'Empresa',
                apellido: 'LM',
                subsidiaria: '5',
                uso_cfdi: {
                    value: '3',
                    text: 'G03 - Expenses in General',
                },
                metodo_pago: {
                    value: '3',
                    text: '03 - Electronic Funds Transfer',
                },
                forma_pago: {
                    value: '4',
                    text: 'PPD - Payment in Installments or Deferred',
                },
                regFiscal: {
                    value: '22',
                    text: '',
                },
                id: '1763',
                compania: 'Empresa ML',
                ieps: true,
            },
            direccion: {
                calle: 'Boulevar',
                n_exterior: '15',
                n_interior: '',
                cp: '76000',
                pais: 'MX',
                estado: 'QRO',
                municipio: 'Querétaro',
            },
            contactos: [
                {
                    nombre: 'Jair Trejo',
                    correo: 'jair@efficientix.com',
                },
                {
                    nombre: 'Marco Ramirez',
                    correo: 'marco.ramirez@efficientrix.com',
                },
            ],
            transaccion: {
                amount: 123456,
                consulta: true,
                transId: '9824',
                transType: 'CustInvc',
                uuid: '4e12c719-61ea-4609-bde2-bc183a049ac6',
                isClient: false,
                pdf: 'https://tstdrv2220309.app.netsuite.com/core/media/media.nl?id=38358&c=TSTDRV2220309&h=WpsL6hh2OKhh0GxKrAb6S1MUAi5-utECXk5g7E8gjuQNQRBg&_xt=.pdf',
                xml: 'https://tstdrv2220309.app.netsuite.com/core/media/media.nl?id=38355&c=TSTDRV2220309&h=wMkZsjh_F38Pk0jaBP1qRE61TmsBDxMHZR5NvChzCSDwYNFR&mv=l3ja0oa8&_xt=.xml',
                pdf_name: 'Factura de venta_42229.pdf',
                xml_name: 'Factura de venta_42229.xml',
            },
            success: true,
            msg: 'La factura no existe',
            code: 100,
        }, */
        emailSelecteds: [],
    },
    mutations: {
        // Added setters for Urls
        setServiceConfigUrl(state, data) {
            state.serviceConfigUrl = data
        },
        setKioskoConnectionUrl(state, data) {
            state.kioskoConnectionUrl = data
        },
        setDownloadFilesUrl(state, data) {
            state.downloadFilesUrl = data
        },
        // **********Added variables for statistics************
        setTicketId(state, data) {
            state.ticketId = data
        },

        setTicketDate(state, data) {
            state.ticketDate = data
        },
        setTicketCantidad(state, data) {
            state.ticketCantidad = data
        },
        setTicketRfc(state, data) {
            state.ticketRfc = data
        },
        setMessageTicket(state, data) {
            state.messageTicket = data
        },
        setMessageClient(state, data) {
            state.messageClient = data
        },
        setMessageResume(state, data) {
            state.messageResume = data
        },
        setMessageStamp(state, data) {
            state.messageStamp = data
        },
        setStatusRequestTicket(state, data) {
            state.statusRequestTicket = data
        },
        setStatusRequestClient(state, data) {
            state.statusRequestClient = data
        },
        setStatusRequestResume(state, data) {
            state.statusRequestResume = data
        },
        setStatusRequestStamp(state, data) {
            state.statusRequestStamp = data
        },
        setStartTimeLoading(state, data) {
            state.startTimeLoading = data
        },
        setStartTimeLoadingClient(state, data) {
            state.startTimeLoadingClient = data
        },
        setStartTimeLoadingResume(state, data) {
            state.startTimeLoadingResume = data
        },
        setStartTimeLoadingStamp(state, data) {
            state.startTimeLoadingStamp = data
        },
        // *************Ends variables for statistics**********
        setLoading(state, data) {
            state.isLoading = data
        },
        setAction(state, data) {
            state.action = data
        },
        setStep(state, data) {
            state.step = data
        },
        setAllConfigs(state, data) {
            console.log('AllConfigs suite', data)

            state.allConfigs = data
        },
        setConfigSite(state, data) {
            console.log('config suite', data)
            state.configSite = data
        },
        setTicketSearch(state, data) {
            state.ticketSearch = data
        },
        setAllCountries(state, data) {
            state.countries = data
        },
        setBillingInformation(state, data) {
            state.billingInformation = data
        },
        setClientData(state, data) {
            state.clientData = data
        },
        setClientData_regimenFiscal_value(state, data) {
            state.clientData.cliente.regFiscal.value = data
        },
        setClientData_razonSocial(state, data) {
            state.clientData.cliente.razonSocial = data
        },
        setClientData_compania(state, data) {
            state.clientData.cliente.compania = data
        },
        setClientData_regimenFiscal_text(state, data) {
            state.clientData.cliente.regFiscal.text = data
        },
        setAddContact(state, data) {
            state.clientData.contactos.push(data)
        },
        setEmails(state, data) {
            state.emailSelecteds = data
        },
        addFilterSearch(state, data) {
            if (data.type === 'date') {
                state.ticketSearch[data.name] = ''
            } else {
                state.ticketSearch[data.name] = ''
            }
        },
        setFilterAction(state, data) {
            state.ticketSearch.custparam_accion = data
        },
        setConfigParamSearch(state, data) {
            state.ticketSearch.custparam_config = data
        },
        setTypePerson(state, data) {
            state.clientData.cliente.tipo = data
        },
    },
    actions: {
        setMyActions({ commit }, value) {
            commit('setAction', value)
        },
        setEmailsSelecteds({ commit }, value) {
            commit('setEmails', value)
        },
        setEmailSelected() {
            for (let i = 0; i < this.state.clientData.contactos.length; i++) {
                for (let j = 0; j < this.state.emailSelecteds.length; j++) {
                    if (
                        this.state.clientData.contactos[i].correo ===
                        this.state.emailSelecteds[j].correo &&
                        this.state.clientData.contactos[i].nombre ===
                        this.state.emailSelecteds[j].nombre
                    ) {
                        this.state.clientData.contactos[i].enviar = true
                    }
                }
            }
            // console.log({details: 'Result in: setEmailSelected', value: this.state.clientData.contactos})
        },
        clearFieldsValue() {
            let fields = this.state.configSite.fields
            for (let i = 0; i < fields.length; i++) {
                fields[i].value = ''
            }
        },
        clearTicketSearch() {
            let keys = Object.keys(this.state.ticketSearch)
            for (let i in keys) {
                if (keys[i] != 'custparam_getinfo') {
                    this.state.ticketSearch[keys[i]] = ''
                }
            }
        },
        clearParamsStamp() {
            let keys = Object.keys(this.state.paramsStamp)
            for (let i in keys) {
                if (keys[i] != 'custparam_genera') {
                    this.state.ticketSearch[keys[i]] = ''
                }
            }
        },
        setFormatDate(key, obj) {
            this.state.ticketSearch[obj.key] = obj.newValue
        },
        changeDefaultValue() {
            /* console.log('<<<<<<<<<<<<<<<<<<<<<<Cambio de información por defecto>>>>>>>>>>>>>>>>', {
                forma_pago:this.state.configSite.customerForm['forma_pago'].default,
                uso_cfdi: this.state.configSite.customerForm['uso_cfdi'].default,
                metodo_pago: this.state.configSite.customerForm['metodo_pago'].default
            }) */
            if (
                this.state.configSite.customerForm['forma_pago'].default &&
                this.state.configSite.customerForm['forma_pago'].default !== ''
            ) {
                this.state.clientData.cliente.forma_pago.value =
                    this.state.configSite.customerForm['forma_pago'].default
            }
            if (
                this.state.configSite.customerForm['uso_cfdi'].default &&
                this.state.configSite.customerForm['uso_cfdi'].default !== ''
            ) {
                this.state.clientData.cliente.uso_cfdi.value =
                    this.state.configSite.customerForm['uso_cfdi'].default
            }
            if (
                this.state.configSite.customerForm['metodo_pago'].default &&
                this.state.configSite.customerForm['metodo_pago'].default !== ''
            ) {
                this.state.clientData.cliente.metodo_pago.value =
                    this.state.configSite.customerForm['metodo_pago'].default
            }
        },
    },
    modules: {},
})
