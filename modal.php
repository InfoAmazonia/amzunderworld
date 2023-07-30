<?php $title = 'Story 1'; ?>
<?php include './blocks/header.php'; ?>


<style>
<?php include './src/less/style.css'; ?>
</style>

<!-- wp:code -->
<div class="amz" id="story1">
<!-- /wp:code -->


<!-- wp:code -->
<section>

    <div>
        <div class="item">
            <button data-modal="modalTeste" class="btn"> MODAL </button>
        </div>
    </div>

    <div class="modalbase" id="modalTeste">
        <div class="modal-content">
            <button class="modalclose" data-modal="modalTeste"> </button>
            <h1>MODELO</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque esse corrupti assumenda sapiente. Nisi, esse non vitae recusandae, unde voluptates eius perspiciatis magnam ipsam vel deserunt debitis quibusdam? Architecto, fuga!</p>
        </div>
    </div>


</section>
<!-- /wp:code -->


<!-- wp:code -->
</div>
<!-- /wp:code -->

<!-- Footer -->
<?php include './blocks/footer.php'; ?>