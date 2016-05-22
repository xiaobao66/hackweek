{{if type === 'doc' || type === 'docx'}}
<div class="report-type-info">Word文档预览</div>
{{else if type === 'ppt' || type === 'pptx'}}
<div class="report-type-info">Ppt文档预览</div>
{{else if type === 'pdf'}}
<div class="report-type-info">Pdf文档预览</div>
{{/if}}
<!--<div class="report-preview">-->
    <!--{{each preview}}-->
    <!--<img src="{{$value}}">-->
    <!--{{/each}}-->
<!--</div>-->
<div class="report-preview">
    <iframe src="{{preview}}" id="ifr-container"></iframe>
</div>