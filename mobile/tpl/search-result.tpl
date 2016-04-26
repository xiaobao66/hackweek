{{each result}}
<div class="result-item">
    <input type="hidden" value="{{$value.document_id}}">
    {{if $value.type === 'doc' || $value.type === 'docx'}}
    <img class="result-filetype-icon" src="images/word.png">
    {{else if $value.type === 'ppt' || $value.type === 'pptx'}}
    <img class="result-filetype-icon" src="images/ppt.png">
    {{else if $value.type === 'pdf'}}
    <img class="result-filetype-icon" src="images/pdf.png">
    {{else if $value.type === 'zip'}}
    <img class="result-filetype-icon" src="images/zip.png">
    {{else if $value.type === 'rar'}}
    <img class="result-filetype-icon" src="images/rar.png">
    {{/if}}
    <h3 class="filename">{{$value.document_name}}</h3>
    <p class="file-thumb-info">
        <!--<span class="author-academy">13级计算机学院</span>-->
        <!--<span class="experiment-name">C语言课设</span>-->
        <!--<span class="author-name">雪君</span>-->
        {{$value.grade}} {{$value.institute}} {{$value.class}} {{$value.uploader}}
    </p>
    <p class="file-download-info">
        已有<span class="download-num">{{$value.downloads}}</span>人下载
    </p>
    <p class="file-thumb-content">
        {{$value.document_thumb}}
    </p>
</div>
{{/each}}