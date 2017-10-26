(function() {
	'use strict';

	angular.module('rampup')
		.controller('DllManagementController', DllManagementController);

	/** @ngInject */
	function DllManagementController(MemoryBuffer, DoublyLinkedList, $randomWord) {
		var vm = this;

		vm.title = "Doubly Linked List Management";
		vm.listRepresentationModel = [];
		vm.bufferRepresentationModel = [];
		vm.memoryBuffer = new MemoryBuffer();
		vm.list = new DoublyLinkedList(vm.memoryBuffer);

		vm.onAddElementClick = onAddElementClick;
		vm.onMouseEnterElement = onMouseEnterElement;
		vm.onMouseLeaveElement = onMouseLeaveElement;

		fillRepresentationModels();

		function onAddElementClick() {
			instatiateNewNode();
		}

		function onMouseEnterElement(element) {
			showHighlights(element.node);
		}

		function onMouseLeaveElement(element) {
			clearHighlights(element.node);
		}

		function showHighlights(node) {
			triggerHighlights(node, true);
		}

		function clearHighlights(node) {
			triggerHighlights(node, false);
		}

		function triggerHighlights(node, isVisible) {
			var highlight = vm.list.isNodeFirst(node) || vm.list.isNodeLast(node) ? 'static' : 'active';
			highlight = isVisible ? highlight : 'regular';
			changeRepresentationHighlights(node, highlight);

			highlight = isVisible ? 'compare' : 'regular';

			if (node.forwardLink) {
				var fwNode = vm.memoryBuffer.getByAddress(node.forwardLink);
				changeRepresentationHighlights(fwNode, highlight);
			}

			if (node.backwardLink) {
				var bwNode = vm.memoryBuffer.getByAddress(node.backwardLink);
				changeRepresentationHighlights(bwNode, highlight);
			}
		}

		function changeRepresentationHighlights(node, highlight) {
			getListRepresentationElement(node).highlight = highlight;
			getBufferRepresentationElement(node).highlight = highlight;
		}

		function fillRepresentationModels() {
			for (var i = 0; i < 5; i++) {
				instatiateNewNode();
			}
		}

		function instatiateNewNode() {
			$randomWord.next(3, 6).then(function(word){
				var node = vm.list.add(word);
				vm.bufferRepresentationModel.push({ value: node._address, node: node });
				vm.listRepresentationModel.push({ value: word, node: node });
			});
		}

		function getBufferRepresentationElement(node) {
			for (var i = 0; i < vm.bufferRepresentationModel.length; i++) {
				if (vm.bufferRepresentationModel[i].node === node)
					return vm.bufferRepresentationModel[i];
			}
		}

		function getListRepresentationElement(node) {
			for (var i = 0; i < vm.listRepresentationModel.length; i++) {
				if (vm.listRepresentationModel[i].node === node)
					return vm.listRepresentationModel[i];
			}
		}
	}

})();
