from pathlib import Path
import networkx as nx
from pyvis.network import Network
from django.core.files import File
from django.conf import settings


def visualize_route_AB(list_of_node_ids: int,
                       id_name_dict: dict) -> File:
    result_graph: nx.DiGraph = nx.DiGraph()

    for node in list_of_node_ids:
        node_label: str = f'[{node}] {id_name_dict[str(node)]}'
        result_graph.add_node(node, size=10, label=node_label)

    for i in range(1, len(list_of_node_ids)):
        result_graph.add_edge(list_of_node_ids[i-1],
                              list_of_node_ids[i])

    network = Network(height='900px', notebook=True, directed=True)
    network.from_nx(result_graph)
    network.show('from_A_to_B.html')

    route_html_path = Path(f'{settings.BASE_DIR}/from_A_to_B.html')
    route_html = route_html_path.open('rb') 
    return File(route_html, route_html_path.name)