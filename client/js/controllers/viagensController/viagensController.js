/**
 * @autor -  Lucas Henrique de Abreu - <lucasigual14@gmail.com>
 * Controller: ViagensController, responsável por funções de cadastro e listagem das pessoas vinculadas ao usuário.
 * data: 18/01/2017
 */
(function (angular) {
	'use strict';
	var ViagensController = (function () {
		function ViagensController($location, $mdDialog,dialogService,showToast, $scope, $rootScope, httpService) {
			var self 				= this;
			self.$mdDialog 			= $mdDialog;
			self.dialogService 		= dialogService;
			self.$scope				= $scope;
			self.showToast			= showToast;
			self.userLogged			= $rootScope.userLogged;
			self.httpService		= httpService;
			if (self.userLogged) {
				self.getViagens(self.userLogged);
			} else {
				self.showToast.showSimpleToast('Você deve estar logado para vizualizar esta tela.', '');
				$location.url('login')
			}
		}

		/**
		 * Busca na base de dados viagens ,
		 * para o usuário logado.
		 **/
		ViagensController.prototype.getViagens = function(pessoa){
			var self = this;
			self.httpService.get('viagens?id='+pessoa._id).then(function(res) {
				self.viagens = res.data;
			});
		};

		ViagensController.prototype.showDialog = function(ev, viagem) {
			var self = this;
			self.dialogService.openDialog(
				'partials/dialog/viagens.html', 'ViagensDialogController',
				(function(viagem){
					self.viagens.push(viagem);
					self.showToast.showSimpleToast('Alterações cadastrados com sucesso.', '');
				}), ev, {viagem: viagem, userLogged: self.userLogged}, 
				self.$scope
			)
		};

		ViagensController.$inject = [
			'$location',
			'$mdDialog',
			'dialogService',
			'showToast',
			'$scope',
			'$rootScope',
			'httpService'
		];
		return ViagensController;
	}());

	angular.module('app.controllers').controller('ViagensController', ViagensController);

})(window.angular);