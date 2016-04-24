{{if result.type === 'doc' || result.type === 'docx'}}
<img src="images/word.png">
{{else if result.type === 'ppt' || result.type === 'pptx'}}
<img src="images/ppt.png">
{{else if result.type === 'pdf'}}
<img src="images/pdf.png">
{{/if}}
<div class="report-info-container">
    <p class="report-name">{{result.document_name}}</p>
    <p class="report-thumb">{{result.grade}}{{result.institude}} {{result.class}} {{result.uploader}}</p>
    <p class="report-download-info">
        已有<span class="report-download-number">{{result.downloads}}</span>人下载
    </p>
</div>