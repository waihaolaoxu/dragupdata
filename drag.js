/*
	dragstart：要被拖拽的元素开始拖拽时触发，这个事件对象是被拖拽元素
	dragenter：拖拽元素进入目标元素时触发，这个事件对象是目标元素
	dragover：拖拽某元素在目标元素上移动时触发，这个事件对象是目标元素
	dragleave：拖拽某元素离开目标元素时触发，这个事件对象是目标元素
	drop：将被拖拽元素放在目标元素内时触发，这个事件对象是目标元素
	dragend：在drop之后触发，就是拖拽完毕时触发，这个事件对象是被拖拽元素
	完成一次成功页面内元素拖拽的行为事件过程应该是： dragstart –> dragenter –> dragover –> drop –> dragend
*/
//拖拽文件功能演示
function DragAndDrop(node){
	this.node=node;
	this.init();
}

DragAndDrop.prototype={
	init:function(){
		var self=this;
		this.node.addEventListener("dragenter",function(e){
			self.removeDefault(e);
			$(self.node).css("border-color","#27A7D8");
			$('.dragenter').show();
			$('.dragleave').hide();
		},false);
		this.node.addEventListener("dragover",function(e){
			self.removeDefault(e);
			$('.dragover').show();
		},false)
		this.node.addEventListener("dragleave",function(e){
			self.removeDefault(e);
			$(self.node).removeAttr("style");
			$('.dragleave').show();
			$('.dragenter,.dragover').hide();
		},false)  
	},
	imgFileDrop:function(){
		var self=this;
		self.node.addEventListener("drop",function(e){
			self.removeDefault(e);
			var fileList=e.dataTransfer.files;
			//console.log(fileList)
			if(fileList.length===0||fileList[0].type.indexOf('image')===-1){return;};
			var reader=new FileReader();
			var x=e.pageX;
			var y=e.pageY;
			reader.onload=function(e){
				var src=this.result;
				imgHtml='<div class="drag_img"><img src='+src+' /></div>';
				$(self.node).html(imgHtml);
				$(self.node).removeAttr("style");
				$(self.node).children().eq(0).css({
				    "left":x-$(".canvas").offset().left,
					"top":y-$(".canvas").offset().top
				});
			}
			reader.readAsDataURL(fileList[0]);
		},false)
		
	},
	removeDefault:function(m){
		m.stopPropagation();//组织冒泡
		m.preventDefault();//组织默认行为
	},
	htmlDrop:function(){
		var self=this;
		this.node.addEventListener("drop",function(e){
			var _html ='<div class="item" id=Layer'+e.dataTransfer.getData('id')+'>'+e.dataTransfer.getData('_html')+'</div>';
			$(self.node).append(_html);
			$(self.node).removeAttr("style");
		},false);
	}
}

