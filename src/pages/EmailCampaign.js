import { Box, Button, Container, Dialog, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useAuthContext from '../context/AuthContext';
import { getCustomers } from '../helpers/customerHelper';
import { SendEmailCampignBulk } from 'src/helpers/dashboardHelper';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';

const EmailCampaign = () => {
  const { currentOrgId } = useAuthContext();
  const [emails, setEmails] = useState([]);
  const [currentTab, setCurrentTab] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const [subject, setSubject] = useState('');
  const [from,setFrom] = useState('');
  const [isLoading,setIsLoading] = useState(false)
  const [htmlString, setHtmlString] =
    useState(`<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>
  <!--[if gte mso 15]>
  <xml>
  <o:OfficeDocumentSettings>
  <o:AllowPNG/>
  <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <meta charset="UTF-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>*|MC:SUBJECT|*</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Work+Sans:400,400i,700,700i,900,900i"/><style>          img{-ms-interpolation-mode:bicubic;} 
            table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;} 
            .mceStandardButton, .mceStandardButton td, .mceStandardButton td a{mso-hide:all !important;} 
            p, a, li, td, blockquote{mso-line-height-rule:exactly;} 
            p, a, li, td, body, table, blockquote{-ms-text-size-adjust:100%; -webkit-text-size-adjust:100%;} 
            @media only screen and (max-width: 480px){
              body, table, td, p, a, li, blockquote{-webkit-text-size-adjust:none !important;} 
            }
            .mcnPreviewText{display: none !important;} 
            .bodyCell{margin:0 auto; padding:0; width:100%;}
            .ExternalClass, .ExternalClass p, .ExternalClass td, .ExternalClass div, .ExternalClass span, .ExternalClass font{line-height:100%;} 
            .ReadMsgBody{width:100%;} .ExternalClass{width:100%;} 
            a[x-apple-data-detectors]{color:inherit !important; text-decoration:none !important; font-size:inherit !important; font-family:inherit !important; font-weight:inherit !important; line-height:inherit !important;} 
              body{height:100%; margin:0; padding:0; width:100%; background: #ffffff;}
              p{margin:0; padding:0;} 
              table{border-collapse:collapse;} 
              td, p, a{word-break:break-word;} 
              h1, h2, h3, h4, h5, h6{display:block; margin:0; padding:0;} 
              img, a img{border:0; height:auto; outline:none; text-decoration:none;} 
              a[href^="tel"], a[href^="sms"]{color:inherit; cursor:default; text-decoration:none;} 
              li p {margin: 0 !important;}
              .ProseMirror a {
                  pointer-events: none;
              }
              @media only screen and (max-width: 640px){
                  .mceClusterLayout td{padding: 4px !important;} 
              }
              @media only screen and (max-width: 480px){
                  body{width:100% !important; min-width:100% !important; } 
                  body.mobile-native {
                      -webkit-user-select: none; user-select: none; transition: transform 0.2s ease-in; transform-origin: top center;
                  }
                  body.mobile-native.selection-allowed a, body.mobile-native.selection-allowed .ProseMirror {
                      user-select: auto;
                      -webkit-user-select: auto;
                  }
                  colgroup{display: none;}
                  img{height: auto !important;}
                  .mceWidthContainer{max-width: 660px !important;}
                  .mceColumn{display: block !important; width: 100% !important;}
                  .mceColumn-forceSpan{display: table-cell !important; width: auto !important;}
                  .mceColumn-forceSpan .mceButton a{min-width:0 !important;}
                  .mceBlockContainer{padding-right:16px !important; padding-left:16px !important;} 
                  .mceBlockContainerE2E{padding-right:0px; padding-left:0px;} 
                  .mceSpacing-24{padding-right:16px !important; padding-left:16px !important;}
                  .mceImage, .mceLogo{width: 100% !important; height: auto !important;} 
                  .mceFooterSection .mceText, .mceFooterSection .mceText p{font-size: 16px !important; line-height: 140% !important;}
              }
              div[contenteditable="true"] {outline: 0;}
              .ProseMirror .empty-node, .ProseMirror:empty {position: relative;}
              .ProseMirror .empty-node::before, .ProseMirror:empty::before {
                  position: absolute;
                  left: 0;
                  right: 0;
                  color: rgba(0,0,0,0.2);
                  cursor: text;
              }
              .ProseMirror .empty-node:hover::before, .ProseMirror:empty:hover::before {
                  color: rgba(0,0,0,0.3);
              }
              .ProseMirror h1.empty-node:only-child::before,
              .ProseMirror h2.empty-node:only-child::before,
              .ProseMirror h3.empty-node:only-child::before,
              .ProseMirror h4.empty-node:only-child::before {
                  content: 'Heading';
              }
              .ProseMirror p.empty-node:only-child::before, .ProseMirror:empty::before {
                  content: 'Start typing...';
              }
              a .ProseMirror p.empty-node::before, a .ProseMirror:empty::before {
                  content: '';
              }
              .mceText, .ProseMirror {
                  white-space: pre-wrap;
              }
              .mceImageBorder {display: inline-block;}
              .mceImageBorder img {border: 0 !important;}
  body, #bodyTable { background-color: rgb(240, 203, 195); }.mceText, .mceLabel { font-family: "Work Sans", sans-serif; }.mceText, .mceLabel { color: rgb(0, 0, 0); }.mceText h1 { margin-bottom: 0px; }.mceText p { margin-bottom: 0px; }.mceText label { margin-bottom: 0px; }.mceText input { margin-bottom: 0px; }.mceSpacing-24 .mceInput + .mceErrorMessage { margin-top: -12px; }.mceText h1 { margin-bottom: 0px; }.mceText p { margin-bottom: 0px; }.mceText label { margin-bottom: 0px; }.mceText input { margin-bottom: 0px; }.mceSpacing-12 .mceInput + .mceErrorMessage { margin-top: -6px; }.mceText h1 { margin-bottom: 0px; }.mceText p { margin-bottom: 0px; }.mceText label { margin-bottom: 0px; }.mceText input { margin-bottom: 0px; }.mceSpacing-48 .mceInput + .mceErrorMessage { margin-top: -24px; }.mceInput { background-color: transparent; border: 2px solid rgb(208, 208, 208); width: 60%; color: rgb(77, 77, 77); display: block; }.mceInput[type="radio"], .mceInput[type="checkbox"] { float: left; margin-right: 12px; display: inline; width: auto !important; }.mceLabel > .mceInput { margin-bottom: 0px; margin-top: 2px; }.mceLabel { display: block; }.mceText p { color: rgb(0, 0, 0); font-family: "Work Sans", sans-serif; font-size: 16px; font-weight: normal; line-height: 1.5; text-align: left; direction: ltr; }.mceText h1 { color: rgb(28, 47, 52); font-family: "Work Sans", sans-serif; font-size: 31px; font-weight: bold; line-height: 1.5; text-align: left; direction: ltr; }.mceText a { color: rgb(105, 35, 64); font-style: normal; font-weight: normal; text-decoration: underline; direction: ltr; }
  @media only screen and (max-width: 480px) {
              .mceText p { font-size: 16px !important; line-height: 1.5 !important; }
            }
  @media only screen and (max-width: 480px) {
              .mceText h1 { font-size: 31px !important; line-height: 1.5 !important; }
            }
  @media only screen and (max-width: 480px) {
              .mceBlockContainer { padding-left: 16px !important; padding-right: 16px !important; }
            }
  #dataBlockId-12 p, #dataBlockId-12 h1, #dataBlockId-12 h2, #dataBlockId-12 h3, #dataBlockId-12 h4, #dataBlockId-12 ul { text-align: center; }#dataBlockId-1 p, #dataBlockId-1 h1, #dataBlockId-1 h2, #dataBlockId-1 h3, #dataBlockId-1 h4, #dataBlockId-1 ul { text-align: center; }
  @media only screen and (max-width: 480px) {
          .mobileClass-149 {padding-left: 12 !important;padding-top: 0 !important;padding-right: 12 !important;}.mobileClass-149 {padding-left: 12 !important;padding-top: 0 !important;padding-right: 12 !important;}.mobileClass-149 {padding-left: 12 !important;padding-top: 0 !important;padding-right: 12 !important;}
        }</style>
  <script>!function(){function o(n,i){if(n&&i)for(var r in i)i.hasOwnProperty(r)&&(void 0===n[r]?n[r]=i[r]:n[r].constructor===Object&&i[r].constructor===Object?o(n[r],i[r]):n[r]=i[r])}try{var n=decodeURIComponent("%7B%0A%22ResourceTiming%22%3A%7B%0A%22comment%22%3A%20%22Clear%20RT%20Buffer%20on%20mPulse%20beacon%22%2C%0A%22clearOnBeacon%22%3A%20true%0A%7D%2C%0A%22AutoXHR%22%3A%7B%0A%22comment%22%3A%20%22Monitor%20XHRs%20requested%20using%20FETCH%22%2C%0A%22monitorFetch%22%3A%20true%2C%0A%22comment%22%3A%20%22Start%20Monitoring%20SPAs%20from%20Click%22%2C%0A%22spaStartFromClick%22%3A%20true%0A%7D%2C%0A%22PageParams%22%3A%7B%0A%22comment%22%3A%20%22Monitor%20all%20SPA%20XHRs%22%2C%0A%22spaXhr%22%3A%20%22all%22%0A%7D%0A%7D");if(n.length>0&&window.JSON&&"function"==typeof window.JSON.parse){var i=JSON.parse(n);void 0!==window.BOOMR_config?o(window.BOOMR_config,i):window.BOOMR_config=i}}catch(r){window.console&&"function"==typeof window.console.error&&console.error("mPulse: Could not parse configuration",r)}}();</script>
                                <script>!function(a){var e="https://s.go-mpulse.net/boomerang/",t="addEventListener";if("True"=="True")a.BOOMR_config=a.BOOMR_config||{},a.BOOMR_config.PageParams=a.BOOMR_config.PageParams||{},a.BOOMR_config.PageParams.pci=!0,e="https://s2.go-mpulse.net/boomerang/";if(window.BOOMR_API_key="QAT5G-9HZLF-7EDMX-YMVCJ-QZJDA",function(){function n(e){a.BOOMR_onload=e&&e.timeStamp||(new Date).getTime()}if(!a.BOOMR||!a.BOOMR.version&&!a.BOOMR.snippetExecuted){a.BOOMR=a.BOOMR||{},a.BOOMR.snippetExecuted=!0;var i,_,o,r=document.createElement("iframe");if(a[t])a[t]("load",n,!1);else if(a.attachEvent)a.attachEvent("onload",n);r.src="javascript:void(0)",r.title="",r.role="presentation",(r.frameElement||r).style.cssText="width:0;height:0;border:0;display:none;",o=document.getElementsByTagName("script")[0],o.parentNode.insertBefore(r,o);try{_=r.contentWindow.document}catch(O){i=document.domain,r.src="javascript:var d=document.open();d.domain='"+i+"';void(0);",_=r.contentWindow.document}_.open()._l=function(){var a=this.createElement("script");if(i)this.domain=i;a.id="boomr-if-as",a.src=e+"QAT5G-9HZLF-7EDMX-YMVCJ-QZJDA",BOOMR_lstart=(new Date).getTime(),this.body.appendChild(a)},_.write("<bo"+'dy onload="document._l();">'),_.close()}}(),"400".length>0)if(a&&"performance"in a&&a.performance&&"function"==typeof a.performance.setResourceTimingBufferSize)a.performance.setResourceTimingBufferSize(400);!function(){if(BOOMR=a.BOOMR||{},BOOMR.plugins=BOOMR.plugins||{},!BOOMR.plugins.AK){var e=""=="true"?1:0,t="",n="m6ooykix3cojazsfu5pa-f-9349a8401-clientnsv4-s.akamaihd.net",i="false"=="true"?2:1,_={"ak.v":"37","ak.cp":"1513051","ak.ai":parseInt("963350",10),"ak.ol":"0","ak.cr":19,"ak.ipv":4,"ak.proto":"h2","ak.rid":"1bd980f7","ak.r":36095,"ak.a2":e,"ak.m":"x","ak.n":"essl","ak.bpcip":"103.156.236.0","ak.cport":61303,"ak.gh":"23.210.93.61","ak.quicv":"","ak.tlsv":"tls1.3","ak.0rtt":"","ak.csrc":"-","ak.acc":"","ak.t":"1715840862","ak.ak":"hOBiQwZUYzCg5VSAfCLimQ==R+P0Guw8a6LgYLCBlQsy1k6OFe8A7xqtqnLWVyoiI3Clsi+Uljey077hmGJou27qAMbFONPhISpmZk7ZVvjIadrvuY2jKatQTiRzsb5SUBNmO29RwlXRhywMG8WS4gZ6HEfd9E254xWgUvJ6H0ObYijWokl6ErC0uA62PMKGIMM3fNN6thi3P7HSXLlkVnX0rsVwfoftoqrat+JLXSQ6ykgmYbwRnPulxc/BbCMHniiwoDreFbOB7yuD1SBtCOdDOGEXS0PNx9fRYOvvLhVEVJaGpv1r3pez3X/Jvl+S4ZjvZjwOWtP+zgVNG16s/CYhYji5SvVIDqs6YjI3/pG0WYLhR/jtTg1/uMb4PThtAvIWVrnP6ERNsiZV9BQjp52UMT3xa6KckKuqiBQPOAFOJH6S4obvfZhZQrHGCPQOx4o=","ak.pv":"33","ak.dpoabenc":"","ak.tf":i};if(""!==t)_["ak.ruds"]=t;var o={i:!1,av:function(e){var t="http.initiator";if(e&&(!e[t]||"spa_hard"===e[t]))_["ak.feo"]=void 0!==a.aFeoApplied?1:0,BOOMR.addVar(_)},rv:function(){var a=["ak.bpcip","ak.cport","ak.cr","ak.csrc","ak.gh","ak.ipv","ak.m","ak.n","ak.ol","ak.proto","ak.quicv","ak.tlsv","ak.0rtt","ak.r","ak.acc","ak.t","ak.tf"];BOOMR.removeVar(a)}};BOOMR.plugins.AK={akVars:_,akDNSPreFetchDomain:n,init:function(){if(!o.i){var a=BOOMR.subscribe;a("before_beacon",o.av,null,null),a("onbeacon",o.rv,null,null),o.i=!0}return this},is_complete:function(){return!0}}}}()}(window);</script></head>
  <body>
  <!--*|IF:MC_PREVIEW_TEXT|*-->
  <!--[if !gte mso 9]><!----><span class="mcnPreviewText" style="display:none; font-size:0px; line-height:0px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; visibility:hidden; mso-hide:all;">*|MC_PREVIEW_TEXT|*</span><!--<![endif]-->
  <!--*|END:IF|*-->
  <center>
  <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="background-color: rgb(240, 203, 195);">
  <tbody><tr>
  <td class="bodyCell" align="center" valign="top">
  <table id="root" border="0" cellpadding="0" cellspacing="0" width="100%"><tbody data-block-id="16" class="mceWrapper"><tr><td align="center" valign="top" class="mceWrapperOuter"><!--[if (gte mso 9)|(IE)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="660" style="width:660px;"><tr><td><![endif]--><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:660px" role="presentation"><tbody><tr><td style="background-color:#dfa599;background-position:center;background-repeat:no-repeat;background-size:cover" class="mceWrapperInner" valign="top"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" data-block-id="15"><tbody><tr class="mceRow"><td style="background-position:center;background-repeat:no-repeat;background-size:cover" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td style="padding-top:0;padding-bottom:0" class="mceColumn" data-block-id="-10" valign="top" colspan="12" width="100%"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td style="padding-top:48px;padding-bottom:12px;padding-right:24px;padding-left:24px" class="mceBlockContainer" valign="top"><div data-block-id="1" class="mceText" id="dataBlockId-1" style="width:100%"><p class="last-child"><a href="*|ARCHIVE|*">View this email in your browser</a></p></div></td></tr><tr><td style="background-color:transparent;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0" class="mceBlockContainer" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:transparent" role="presentation" class="mceDividerContainer" data-block-id="2"><tbody><tr><td style="min-width:100%;border-top:20px solid transparent" class="mceDividerBlock" valign="top"></td></tr></tbody></table></td></tr><tr><td style="padding-top:12px;padding-bottom:12px;padding-right:48px;padding-left:48px" class="mceBlockContainer" align="center" valign="top"><span class="mceImageBorder" style="border:0;vertical-align:top;margin:0"><img data-block-id="3" width="130" height="auto" style="width:130px;height:auto;max-width:130px !important;display:block" alt="Logo" src="https://cdn-images.mailchimp.com/template_images/email/logo-placeholder.png" class="mceLogo"/></span></td></tr><tr><td style="background-color:transparent;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0" class="mceBlockContainer" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:transparent" role="presentation" class="mceDividerContainer" data-block-id="4"><tbody><tr><td style="min-width:100%;border-top:20px solid transparent" class="mceDividerBlock" valign="top"></td></tr></tbody></table></td></tr><tr><td style="padding-top:12px;padding-bottom:12px;padding-right:24px;padding-left:24px" class="mceBlockContainer" valign="top"><div data-block-id="5" class="mceText" id="dataBlockId-5" style="width:100%"><h1 class="last-child">It's time to design your email</h1></div></td></tr><tr><td style="padding-top:12px;padding-bottom:12px;padding-right:0;padding-left:0" class="mceBlockContainer" align="center" valign="top"><span class="mceImageBorder" style="border:0;vertical-align:top;margin:0"><img data-block-id="6" width="564" height="auto" style="width:564px;height:auto;max-width:1128px !important;display:block" alt="" src="https://cdn-images.mailchimp.com/template_images/email/default_image_placeholder.png" role="presentation" class="imageDropZone mceImage"/></span></td></tr><tr><td style="padding-top:12px;padding-bottom:12px;padding-right:24px;padding-left:24px" class="mceBlockContainer" valign="top"><div data-block-id="7" class="mceText" id="dataBlockId-7" style="width:100%"><p class="last-child">You can define the layout of your email and give your content a place to live by adding, rearranging, and deleting content blocks.</p></div></td></tr><tr><td style="padding-top:12px;padding-bottom:12px;padding-right:48px;padding-left:48px" class="mceBlockContainer" valign="top"><table border="0" cellpadding="0" cellspacing="0" role="presentation" data-block-id="8" class="mceButtonContainer"><tbody><tr><!--[if !mso]><!--></tr><tr class="mceStandardButton"><td style="background-color:#dfa599;border-radius:0;text-align:center" class="mceButton" valign="top"><a href="" target="_blank" class="mceButtonLink" style="background-color:#dfa599;border-radius:0;border:2px solid #1c2f34;color:#000000;display:block;font-family:'Work Sans', sans-serif;font-size:16px;font-weight:normal;font-style:normal;padding:16px 28px;text-decoration:none;min-width:30px;text-align:center;direction:ltr;letter-spacing:0px">Add button text</a></td></tr><tr><!--<![endif]--></tr><tr>
  <!--[if mso]>
  <td align="undefined">
  <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:w="urn:schemas-microsoft-com:office:word"
  href=""
  style="v-text-anchor:middle; width:183.73px; height:54.67px;"
  arcsize="0%"
  strokecolor="#1c2f34"
  strokeweight="2px"
  fillcolor="#dfa599">
  <v:stroke dashstyle="solid"/>
  <w:anchorlock />
  <center style="
  color: #000000;
  display: block;
  font-family: 'Work Sans', sans-serif;
  font-size: 16;
  font-style: normal;
  font-weight: normal;
  letter-spacing: 0px;
  text-decoration: none;
  text-align: center;
  direction: ltr;"
  >
  Add button text
  </center>
  </v:roundrect>
  </td>
  <![endif]-->
  </tr></tbody></table></td></tr><tr><td style="background-color:transparent;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0" class="mceBlockContainer" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:transparent" role="presentation" class="mceDividerContainer" data-block-id="9"><tbody><tr><td style="min-width:100%;border-top:20px solid transparent" class="mceDividerBlock" valign="top"></td></tr></tbody></table></td></tr><tr><td style="padding-top:12px;padding-bottom:12px;padding-right:0;padding-left:0" class="mceLayoutContainer" valign="top"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" data-block-id="10"><tbody><tr class="mceRow"><td style="background-position:center;background-repeat:no-repeat;background-size:cover" valign="top"><table border="0" cellpadding="0" cellspacing="24" width="100%" role="presentation"><tbody><tr><td style="margin-bottom:24px" class="mceColumn" data-block-id="-9" valign="top" colspan="12" width="100%"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="" role="presentation" class="mceClusterLayout" data-block-id="-8"><tbody><tr><td style="padding-left:24px;padding-top:0;padding-right:24px" data-breakpoint="149" valign="top" class="mobileClass-149"><a href="https://facebook.com/" style="display:block" target="_blank" data-block-id="-5"><span class="mceImageBorder" style="border:0;vertical-align:top;margin:0"><img width="40" height="auto" style="width:40px;height:auto;max-width:40px !important;display:block" alt="Facebook icon" src="https://cdn-images.mailchimp.com/icons/social-block-v3/block-icons-v3/facebook-filled-dark-40.png" class="mceImage"/></span></a></td><td style="padding-left:24px;padding-top:0;padding-right:24px" data-breakpoint="149" valign="top" class="mobileClass-149"><a href="https://instagram.com/" style="display:block" target="_blank" data-block-id="-6"><span class="mceImageBorder" style="border:0;vertical-align:top;margin:0"><img width="40" height="auto" style="width:40px;height:auto;max-width:40px !important;display:block" alt="Instagram icon" src="https://cdn-images.mailchimp.com/icons/social-block-v3/block-icons-v3/instagram-filled-dark-40.png" class="mceImage"/></span></a></td><td style="padding-left:24px;padding-top:0;padding-right:24px" data-breakpoint="149" valign="top" class="mobileClass-149"><a href="https://x.com/" style="display:block" target="_blank" data-block-id="-7"><span class="mceImageBorder" style="border:0;vertical-align:top;margin:0"><img width="40" height="auto" style="width:40px;height:auto;max-width:40px !important;display:block" alt="Twitter icon" src="https://cdn-images.mailchimp.com/icons/social-block-v3/block-icons-v3/twitter-filled-dark-40.png" class="mceImage"/></span></a></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td style="padding-top:8px;padding-bottom:8px;padding-right:8px;padding-left:8px" class="mceLayoutContainer" valign="top"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" data-block-id="14" id="section_b187fcaf4eba32e108a4f976843de33d" class="mceFooterSection"><tbody><tr class="mceRow"><td style="background-position:center;background-repeat:no-repeat;background-size:cover" valign="top"><table border="0" cellpadding="0" cellspacing="12" width="100%" role="presentation"><tbody><tr><td style="padding-top:0;padding-bottom:0;margin-bottom:12px" class="mceColumn" data-block-id="-3" valign="top" colspan="12" width="100%"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td style="padding-top:12px;padding-bottom:12px;padding-right:0;padding-left:0" class="mceBlockContainer" align="center" valign="top"><span class="mceImageBorder" style="border:0;vertical-align:top;margin:0"><img data-block-id="11" width="110" height="auto" style="width:110px;height:auto;max-width:110px !important;display:block" alt="Logo" src="https://cdn-images.mailchimp.com/template_images/email/logo-placeholder.png" class="mceLogo"/></span></td></tr><tr><td style="padding-top:12px;padding-bottom:12px;padding-right:16px;padding-left:16px" class="mceBlockContainer" align="center" valign="top"><div data-block-id="12" class="mceText" id="dataBlockId-12" style="display:inline-block;width:100%"><p class="last-child"><em><span style="font-size: 12px">Copyright (C) *|CURRENT_YEAR|* *|LIST:COMPANY|*. All rights reserved.</span></em><br/><span style="font-size: 12px">*|IFNOT:ARCHIVE_PAGE|**|LIST:DESCRIPTION|**|END:IF|*</span><br/><br/><span style="font-size: 12px">Our mailing address is:</span><br/><span style="font-size: 12px">*|IFNOT:ARCHIVE_PAGE|**|HTML:LIST_ADDRESS|**|END:IF|*</span><br/><br/><span style="font-size: 12px">Want to change how you receive these emails?</span><br/><span style="font-size: 12px">You can </span><a href="*|UPDATE_PROFILE|*"><span style="font-size: 12px">update your preferences</span></a><span style="font-size: 12px"> or </span><a href="*|UNSUB|*"><span style="font-size: 12px">unsubscribe</span></a></p></div></td></tr><tr><td class="mceLayoutContainer" align="center" valign="top"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" data-block-id="-2"><tbody><tr class="mceRow"><td style="background-position:center;background-repeat:no-repeat;background-size:cover" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td class="mceColumn" data-block-id="-11" valign="top" colspan="12" width="100%"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td align="center" valign="top"><div><div data-block-id="13"><a href="http://eepurl.com/iOAgMk" target="_blank" rel="noopener noreferrer"><img style="max-width:100%" width="137" height="53" alt="Email Marketing Powered by Mailchimp" title="Mailchimp Email Marketing" src="https://cdn-images.mailchimp.com/monkey_rewards/intuit-mc-rewards-2.png"/></a></div></div></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr></tbody></table>
  </td>
  </tr>
  </tbody></table>
  </center>
  <script type="text/javascript"  src="/XdLURIWI/4Wx/OVk/0GGnrQ_dFh/Y1ObVfkQ2NiO/JGYDCm02CA/L2g/zKBsdGxQ"></script></body></html>`);
  const getCustomerList = async () => {
    try {
      const result = await getCustomers(currentOrgId, '1');
      
      setEmails(result.data?.map((val) => val.email));
    } catch (error) {
      //
    } finally {
      //
    }
  };

  const handleSendMail = async () => {
    setIsLoading(true)
    try {
      const res = await SendEmailCampignBulk(emails,subject,htmlString)
      console.log(res)
      if (res.success) {
        toast.success(res.success);
        setIsLoading(false)
        
      }
    } catch {
      //
    } finally {
      
    }
  };
  
  useEffect(() => {
    getCustomerList();
  }, [currentOrgId]);

  return (
    <Container sx={{ marginTop: { sm: -3, xs: -1 } }}>
      <Typography variant="h4" gutterBottom>
        Email Campaign
      </Typography>
      <Box maxWidth={'80%'} height={'auto'} border={1} borderColor={'silver'}>
        <Stack direction={'column'} p={2} borderBottom={1} borderColor={'silver'} gap={2}>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Box>
              <Typography variant="h6">To</Typography>
              <Typography variant="subtitle2" color={'gray'}>
                Who are you sending this email to?
              </Typography>
            </Box>
            {currentTab !== 'To' && (
              <Button sx={{ alignSelf: 'center' }} variant="outlined" onClick={() => setCurrentTab('To')}>
                See List
              </Button>
            )}

            {currentTab == 'To' && (
              <Button sx={{ alignSelf: 'center' }} variant="outlined" onClick={() => setCurrentTab(null)}>
                Cancel
              </Button>
            )}
          </Stack>
          {currentTab == 'To' && (
            <Box height={'150px'} sx={{ overflowY: emails && emails.length > 3 ? 'scroll' : 'hidden' }}>
              {emails?.map((val) => {
                return <Typography p={0.5}>{val}</Typography>;
              })}
            </Box>
          )}
        </Stack>

        <Stack direction={'column'} p={2} borderBottom={1} borderColor={'silver'}>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Box>
              <Typography variant="h6">From</Typography>
              <TextField
                  sx={{ width: '200%' }}
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  variant="outlined"
                  size="small"
                />
            </Box>
            <Stack direction={'row'} gap={2} mt={2}>
                <Button variant="contained" onClick={() => setCurrentTab(null)} disabled={!from ? true : false}>
                  Edit
                </Button>
                <Button onClick={() => setCurrentTab(null)}>Cancel</Button>
              </Stack>
          {/*    <Typography variant="subtitle2" color={'gray'}>
                sogofybiztech@gmail.com
              </Typography>
            
          }  <Button disabled sx={{ alignSelf: 'center' }} variant="outlined">
              Edit From
            </Button>*/}
          </Stack>
        </Stack>

        <Stack direction={'column'} p={2} borderBottom={1} borderColor={'silver'} gap={1}>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Box>
              <Typography variant="h6">Subject</Typography>
              <Typography variant="subtitle2" color={'gray'}>
                What's the subject line for this email?
              </Typography>
            </Box>
            {currentTab !== 'Subject' && (
              <Button sx={{ alignSelf: 'center' }} variant="outlined" onClick={() => setCurrentTab('Subject')}>
                Add Subject
              </Button>
            )}
          </Stack>
          {currentTab == 'Subject' && (
            <>
              <Box mt={2} width={'100%'}>
                <Typography variant="body2">Subject</Typography>
                <TextField
                  sx={{ width: '100%' }}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  variant="outlined"
                  size="small"
                />
              </Box>
              <Stack direction={'row'} gap={2} mt={2}>
                <Button variant="contained" onClick={() => setCurrentTab(null)} disabled={!subject ? true : false}>
                  Save
                </Button>
                <Button onClick={() => setCurrentTab(null)}>Cancel</Button>
              </Stack>
            </>
          )}
        </Stack>

        <Stack direction={'column'} p={2} gap={2}>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Box>
              <Typography variant="h6">Content</Typography>
              <Typography variant="subtitle2" color={'gray'}>
                What's the content line for this email?
              </Typography>
            </Box>
            <Button sx={{ alignSelf: 'center' }} variant="outlined" onClick={() => setShowContent(true)}>
              See Preview
            </Button>
          </Stack>
          <Box sx={{ width: '100%' }}>
            <Typography variant="body2" sx={{ width: '100%' }}>
              Paste your html content here
            </Typography>
            <TextField
              sx={{ width: '100%' }}
              multiline
              rows={6}
              //value={htmlString}
              onChange={(e) => setHtmlString(e.target.value)}
            />
          </Box>
        </Stack>
        <Box p={2}>
        <LoadingButton
        variant="contained"
        loading={isLoading}
        onClick={handleSendMail}
      >
        Send
      </LoadingButton>
        </Box>
      </Box>
      <Dialog open={showContent} onClose={() => setShowContent(false)}>
        <div dangerouslySetInnerHTML={{ __html: htmlString }} />
      </Dialog>
    </Container>
  );
};

export default EmailCampaign;