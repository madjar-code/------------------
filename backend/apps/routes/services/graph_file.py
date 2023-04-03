import itertools
from pathlib import Path
import networkx as nx
from networkx.readwrite import json_graph
from pyvis.network import Network
from django.core.files import File
from django.conf import settings


def visualize_route_AB(list_of_node_ids: list,
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


def visualize_routes_A(tree_dict: dict,
                       id_name_dict: dict) -> File:
    result_graph: nx.DiGraph() = nx.DiGraph()
    
    def add_children(parent: int, children) -> None:
        for data in children:
            child = data["id"]
            result_graph.add_edge(parent, child)
            grandchildren = data.get('children', [])
            if grandchildren:
                add_children(child, grandchildren)
            node_label: str = f'[{child}] {id_name_dict[str(child)]}'
            nodedata: dict = {'size': 10, 'label': node_label}
            result_graph.add_node(child, **nodedata)

    root: int = tree_dict['id']
    children = tree_dict.get('children', [])
    node_label: str = f'[{root}] {id_name_dict[str(root)]}'
    nodedata: dict = {'size': 10, 'label': node_label, 'color': 'yellow'}
    result_graph.add_node(root, **nodedata)
    add_children(root, children)

    network = Network(height='900px', notebook=True, directed=True)
    network.from_nx(result_graph)
    network.show('from_A.html')

    route_html_path = Path(f'{settings.BASE_DIR}/from_A.html')
    route_html = route_html_path.open('rb')
    return File(route_html, route_html_path.name)


def visualize_routes_B(tree_dict: dict,
                       id_name_dict: dict) -> File:
    result_graph: nx.DiGraph() = nx.DiGraph()
    
    def add_children(parent: int, children) -> None:
        for data in children:
            child = data["id"]
            result_graph.add_edge(child, parent)
            grandchildren = data.get('children', [])
            if grandchildren:
                add_children(child, grandchildren)
            node_label: str = f'[{child}] {id_name_dict[str(child)]}'
            nodedata: dict = {'size': 10, 'label': node_label}
            result_graph.add_node(child, **nodedata)

    root: int = tree_dict['id']
    children = tree_dict.get('children', [])
    node_label: str = f'[{root}] {id_name_dict[str(root)]}'
    nodedata: dict = {'size': 10, 'label': node_label, 'color': 'yellow'}
    result_graph.add_node(root, **nodedata)
    add_children(root, children)

    network = Network(height='900px', notebook=True, directed=True)
    network.from_nx(result_graph)
    network.show('to_B.html')

    route_html_path = Path(f'{settings.BASE_DIR}/to_B.html')
    route_html = route_html_path.open('rb')
    return File(route_html, route_html_path.name)
